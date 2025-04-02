require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const compression = require('compression');

const {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
} = require('./utils/questionsAnswersHelper.js');
const { uploadToCloudinary } = require('./utils/uploadToCloudinary');
const { postInteractions } = require('./utils/postInteractions');
const { getProduct, fetchAllProducts } = require('./utils/productsHelpers.js');
const reviewsHelpers = require('./utils/reviewsHelpers.js');

const { TOKEN, PORT } = process.env;
const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use(compression());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!Number.isNaN(Number(id))) {
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
  } else {
    next();
  }
});

// *** Q & A *** //

// Question List;
app.get('/questions/:product_id/', async (req, res, next) => {
  try {
    const questionsWithAnswers = await getQuestions(req.params.id);
    res.body = questionsWithAnswers;
  } catch (error) {
    next(error);
  }

  res.status(200).send(res.body);
});

// Answer List;
app.get('/answers/:question_id', getAnswers, (req, res) => {
  res.status(200).send(res.body);
});

// Add Question
app.post('/question', addQuestion, (req, res) => {
  res.sendStatus(201);
});

// Add Answer
app.post('/answer/:question_id', uploadToCloudinary, addAnswer, (req, res) => {
  res.sendStatus(201);
});

// Mark Question As Helpful
app.put('/helpful/question/:question_id', markQuestionAsHelpful, (req, res) => {
  res.sendStatus(204);
});

// Mark Answer As Helpful
app.put('/helpful/answer/:answer_id', markAnswerAsHelpful, (req, res) => {
  res.sendStatus(204);
});

// Report Answer
app.put('/answer/:answer_id/report', reportAnswer, (req, res) => {
  res.sendStatus(204);
});

/////////////// PRODUCTS //////////////////

// Get all the products
app.get('/products', async (req, res, next) => {
  try {
    const products = await axios.get(URL + req.url, {
      headers: {
        authorization: process.env.GIT,
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
                authorization: process.env.GIT,
              },
            }),
            axios.get(`${URL}/products/${item.id}`, {
              headers: {
                authorization: process.env.GIT,
              },
            }),
            axios.get(`${URL}/reviews/meta?product_id=${item.id}`, {
              headers: {
                authorization: process.env.GIT,
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

    res.status(200).send(productsWithImages);
  } catch (error) {
    next(error);
  }
});

/////////////// OVERVIEW COMPONENT //////////////////////

app.get('/products/:id', async (req, res, next) => {
  try {
    const product = await axios.get(URL + req.url, {
      headers: {
        authorization: process.env.GIT,
      },
    });
    const { default_price: defaultPrice, ...rest } = product.data;

    const [
      productStyles,
      productFeatures,
      productReviews,
      productRatings,
      questionsWithAnswers,
    ] = await Promise.all([
      axios.get(`${URL}/products/${req.params.id}/styles`, {
        headers: {
          authorization: process.env.GIT,
        },
      }),
      axios.get(`${URL}/products/${req.params.id}`, {
        headers: {
          authorization: process.env.GIT,
        },
      }),
      axios.get(
        `${URL}/reviews?product_id=${
          req.params.id
        }&page=${1}&count=${300}&sort=${'relevance'}`,
        {
          headers: {
            authorization: process.env.GIT,
          },
        }
      ),
      axios.get(`${URL}/reviews/meta?product_id=${req.params.id}`, {
        headers: {
          authorization: process.env.GIT,
        },
      }),
      getQuestions(req.params.id),
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
      ...rest,
      defaultPrice,
      photo,
      ratingAverage,
      reviewsCount: totalCount,
      features,
      styles,
      questionsWithAnswers,
      reviews,
      metaData,
    };

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
});

// Get all the related products
app.get('/products/:product_id/related', async (req, res, next) => {
  try {
    const products = await axios.get(URL + req.url, {
      headers: {
        authorization: process.env.GIT,
      },
    });

    const productsWithImages = await Promise.all(
      products.data.map(async (item) => {
        const [productData, productStyles, productRatings] = await Promise.all([
          axios.get(`${URL}/products/${item}`, {
            headers: {
              Authorization: TOKEN,
            },
          }),
          axios.get(`${URL}/products/${item}/styles`, {
            headers: {
              authorization: process.env.GIT,
            },
          }),
          axios.get(`${URL}/reviews/meta?product_id=${item}`, {
            headers: {
              authorization: process.env.GIT,
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

    res.status(200).send(productsWithImages);
  } catch (error) {
    next(error);
  }
});

//*** RATINGS and REVIEWS ***//

// GET reviews
app.get('/reviews', (req, res) => {
  reviewsHelpers.getReviews(req.query, (error, reviews) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(reviews);
    }
  });
});

// POST new review
app.post('/reviews', uploadToCloudinary, (req, res) => {
  reviewsHelpers.postReview(req.body, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(201);
    }
  });
});

//GET review metadata
app.get('/reviews/meta', (req, res) => {
  reviewsHelpers.getMetaData(req.query, (error, metadata) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(metadata);
    }
  });
});

//PUT mark review helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  reviewsHelpers.markHelpful(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//PUT report review
app.put('/reviews/:review_id/report', (req, res) => {
  reviewsHelpers.reportReview(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//Reviews Wild Card
app.use('/reviews/*', (req, res) => {
  res.send('404: This page does not exist');
});

//POST interactions
app.post('/interactions', (req, res) => {
  postInteractions(req.body, (error) => {
    if (error) {
      res.sendStatus(422);
    } else {
      res.sendStatus(201);
    }
  });
});

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const port = PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
