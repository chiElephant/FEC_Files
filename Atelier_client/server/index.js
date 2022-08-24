require('dotenv').config();
const path = require('path');
const express = require('express');
const {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
} = require('./questionsAnswersHelper.js');

const app = express();
const reviewsHelper = require('./reviewsHelper.js');

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use(express.json());

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
app.post('/answer/:question_id', addAnswer, (req, res) => {
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

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

app.get('/reviews', (req, res) => {
  reviewsHelper.getReviews(req.query, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.post('/reviews', (req, res) => {
  reviewsHelper.postReview(req.body, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.get('/reviews/meta', (req, res) => {
  reviewsHelper.getMetaData(req.query, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
