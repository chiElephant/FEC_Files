import axios from 'axios';
import getQuestions from './getQuestions';
import fetchRelatedProducts from './fetchRelatedProducts';

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

export default async function fetchProductFromAPI(API_KEY, productId) {
  try {
    const [
      relatedProducts,
      productStyles,
      productFeatures,
      productReviews,
      productRatings,
      questionsWithAnswers,
    ] = await Promise.all([
      fetchRelatedProducts(API_KEY, productId),
      axios.get(`${URL}/products/${productId}/styles`, {
        headers: {
          authorization: API_KEY,
        },
      }),
      axios.get(`${URL}/products/${productId}`, {
        headers: {
          authorization: API_KEY,
        },
      }),
      axios.get(
        `${URL}/reviews?product_id=${productId}&page=${1}&count=${300}&sort=${'relevance'}`,
        {
          headers: {
            authorization: API_KEY,
          },
        }
      ),
      axios.get(`${URL}/reviews/meta?product_id=${productId}`, {
        headers: {
          authorization: API_KEY,
        },
      }),
      getQuestions(API_KEY, productId),
    ]);

    const [features, reviews, metaData, styles] = [
      productFeatures.data.features,
      productReviews.data.results,
      productRatings.data,
      productStyles.data.results,
    ];

    const { totalSum, totalCount } = Object.entries(metaData.ratings).reduce(
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

    metaData.percentRecommended = Math.floor(
      (Number(metaData.recommended.true) / Number(totalCount)) * 100
    );

    metaData.totalReviews = totalCount;
    metaData.avgRating = ratingAverage;

    const firstStyle = productStyles.data.results[0];
    const photo = firstStyle ? firstStyle.photos[0].thumbnail_url : null;
    const productData = {
      relatedProducts,
      photo,
      ratingAverage,
      reviewsCount: totalCount,
      features,
      styles,
      questionsWithAnswers,
      reviews,
      metaData,
    };

    return productData;
  } catch (error) {
    throw Error(error);
  }
}
