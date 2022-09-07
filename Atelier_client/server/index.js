require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
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

const { URL, TOKEN } = process.env;
const app = express();
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const reviewsHelper = require('./utils/reviewsHelper.js');

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('This is our express server for FEC');
});

// *** Q & A *** //

// Question List;
app.get('/questions/:product_id/:page/:count', getQuestions, (req, res) => {
  res.status(200).send(res.body);
});

// Answer List;
app.get('/answers/:question_id/:page/:count', getAnswers, (req, res) => {
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

/////////////// OVERVIEW COMPONENT //////////////////////

app.get('/products/:id', (req, res) => {
  console.log(
    `Received a get request to get the prodcut information for product: ${req.params.id} and  url: ${req.url}`
  );
  axios
    .get(url + req.url, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((product_info) => {
      console.log('This is the product info: ', product_info.data);
      res.send(product_info.data);
    });
});

app.get('/products/:id/styles', (req, res) => {
  axios
    .get(url + req.url, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((product_styles) => {
      console.log('These are the product styles: ', product_styles.data);
      res.send(product_styles.data);
    });
});

app.post('/cart/:sku/:qty', (req, res) => {
  // console.log(`You selected ${req.params.qty} pieces of ${req.params.sku}`);
  // for (let i = 0; i < req.params.qty; i++) {
  // axios
  //   .post(`${url}/cart/`, {
  //     headers: {
  //       Authorization: TOKEN,
  //     },
  //     data: {
  //       sku_id: req.params.sku,
  //     },
  //   })
  axios({
    method: 'post',
    url: `${url}/cart`,
    headers: {
      Authorization: TOKEN,
    },
    data: {
      sku_id: req.params.sku,
    },
  }).then(() => {
    res.status(201);
  });
  // }
});

//*** RATINGS and REVIEWS ***//

//GET reviews
app.get('/reviews', reviewsHelper.getReviews, (req, res) => {
  res.status(200).send(res.body);
});

//POST reviews
app.post('/reviews', reviewsHelper.postReview, (req, res) => {
  console.log('Im Here');
  res.sendStatus(201);
});

//GET review metadata
app.get('/reviews/meta', reviewsHelper.getMetaData, (req, res) => {
  res.status(200).send(res.body);
});

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
