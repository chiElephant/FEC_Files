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
} = require('./questionsAnswersHelper.js');

const app = express();

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

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

app.post('/answer/:answer_id', addAnswer, (req, res) => {
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

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
