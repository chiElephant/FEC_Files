import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

export default async function fetchProductsFromAPI(API_KEY) {
  try {
    const products = await axios.get(`${URL}/products`, {
      headers: {
        authorization: API_KEY,
      },
      params: {
        page: 1,
        count: 15,
      },
    });

    const productsWithImages = await Promise.all(
      products.data.map(async (item) => {
        const { default_price: defaultPrice, ...rest } = item;

        const [productStyles, productFeatures, productRatings] =
          await Promise.all([
            axios.get(`${URL}/products/${item.id}/styles`, {
              headers: {
                authorization: API_KEY,
              },
            }),
            axios.get(`${URL}/products/${item.id}`, {
              headers: {
                authorization: API_KEY,
              },
            }),
            axios.get(`${URL}/reviews/meta?product_id=${item.id}`, {
              headers: {
                authorization: API_KEY,
              },
            }),
          ]);

        const [features, ratings, styles] = [
          productFeatures.data.features,
          productRatings.data.ratings,
          productStyles.data.results,
        ];

        const { totalSum, totalCount } = Object.entries(ratings).reduce(
          (accumulator, [key, value]) => {
            const numericalRating = Number(key);
            const count = Number(value);
            accumulator.totalSum += numericalRating * count;
            accumulator.totalCount += count;
            return accumulator;
          },
          { totalSum: 0, totalCount: 0 }
        );

        let ratingAverage = totalSum / totalCount;
        ratingAverage = Math.round(ratingAverage * 2) / 2;

        const firstStyle = productStyles.data.results[0];
        const photo = firstStyle ? firstStyle.photos[0].thumbnail_url : null;

        return {
          ...rest,
          defaultPrice,
          photo,
          ratingAverage,
          reviewsCount: totalCount,
          features,
          styles,
        };
      })
    );

    return productsWithImages.filter((item) => item.photo !== null);
  } catch (error) {
    throw Error(`Failed to fetch data from API: ${error}`);
  }
}
