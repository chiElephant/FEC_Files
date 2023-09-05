import axios from 'axios';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

export default async function fetchRelatedProducts(API_KEY, productId) {
  try {
    const relatedProducts = await axios.get(
      `${URL}/products/${productId}/related`,
      {
        headers: {
          authorization: API_KEY,
        },
      }
    );

    const relatedProductsWithImages = await Promise.all(
      relatedProducts.data.map(async (item) => {
        const [productData, productStyles, productRatings] = await Promise.all([
          axios.get(`${URL}/products/${item}`, {
            headers: {
              Authorization: API_KEY,
            },
          }),
          axios.get(`${URL}/products/${item}/styles`, {
            headers: {
              authorization: API_KEY,
            },
          }),
          axios.get(`${URL}/reviews/meta?product_id=${item}`, {
            headers: {
              authorization: API_KEY,
            },
          }),
        ]);

        const [data, styles, ratings] = [
          productData.data,
          productStyles.data.results,
          productRatings.data.ratings,
        ];

        const { default_price: defaultPrice, ...rest } = data;

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

        const firstStyle = styles[0];
        const photo = firstStyle ? firstStyle.photos[0].thumbnail_url : null;
        return {
          ...rest,
          defaultPrice,
          photo,
          ratingAverage,
        };
      })
    );

    const removeDuplicatesByProperty = (arr, prop) => {
      const seen = new Set();
      return arr.filter((obj) => {
        if (seen.has(obj[prop])) {
          return false;
        }
        seen.add(obj[prop]);
        return true;
      });
    };

    return removeDuplicatesByProperty(relatedProductsWithImages, 'id');
  } catch (error) {
    throw Error(error);
  }
}
