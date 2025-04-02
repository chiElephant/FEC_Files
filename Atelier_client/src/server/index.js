import express from 'express';
import compression from 'compression';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript';
import { matchPath } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import dotenv from 'dotenv';
import serverRoutes from '../shared/serverRoutes';
import createEmotionCache from '../shared/createEmotionCache';
import getQuestions from '../utils/getQuestions';
import {
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
} from '../utils/questionsAnswersHelper';
import uploadToCloudinary from '../utils/cloudinary';
import reviewsHelpers from '../utils/reviewsHelpers';
import App from '../shared/components/App.jsx';

dotenv.config();

const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.static('dist'));

app.get('/products', async (req, res, next) => {
  const activeRoute = serverRoutes.find((route) => matchPath(route.path, '/'));

  try {
    const data = await activeRoute.fetchInitialData({
      API_KEY: process.env.GIT,
      productId: '/',
    });

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

app.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  const activeRoute = serverRoutes.find((route) =>
    matchPath(route.path, `/${id}`)
  );

  try {
    const data = await activeRoute.fetchInitialData({
      API_KEY: process.env.GIT,
      productId: id,
    });

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

app.get('/questions/:product_id', async (req, res, next) => {
  try {
    const requestParams = {
      API_KEY: process.env.GIT,
      productId: req.params.product_id,
    };
    const { API_KEY, productId } = requestParams;

    const questionsWithAnswers = await getQuestions(API_KEY, productId);
    res.status(200).send(questionsWithAnswers);
  } catch (error) {
    next(error);
  }
});

// Answer List;
app.get('/answers/:question_id', async (req, res, next) => {
  try {
    const { question_id } = req.params;

    const data = await getAnswers(question_id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

// Add Question
app.post('/question', async (req, res, next) => {
  console.log('post question req.body: ', req.body);
  try {
    const data = await addQuestion(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Add Answer
app.post('/answer/:question_id', async (req, res, next) => {
  try {
    const { question_id } = req.params;
    const { body, name, email, photos } = req.body;
    const photoUrls = await uploadToCloudinary(photos);
    await addAnswer(body, name, email, photoUrls, question_id);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// Mark Question As Helpful
app.put('/helpful/question/:question_id', async (req, res, next) => {
  try {
    const { question_id } = req.params;
    const data = await markQuestionAsHelpful(question_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Mark Answer As Helpful
app.put('/helpful/answer/:answer_id', async (req, res, next) => {
  try {
    const { answer_id } = req.params;
    const data = await markAnswerAsHelpful(answer_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Report Answer
app.put('/answer/:answer_id/report', async (req, res, next) => {
  try {
    const { answer_id } = req.params;
    const data = await reportAnswer(answer_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get('*', async (req, res, next) => {
  const activeRoute =
    serverRoutes.find((route) => matchPath(route.path, req.url)) || {};

  try {
    const data = await activeRoute.fetchInitialData({
      API_KEY: process.env.GIT,
      productId: req.url.substring(1),
    });

    const cache = createEmotionCache();
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache);

    const reactApp = renderToString(
      <CacheProvider value={cache}>
        <CssBaseline />
        <StaticRouter location={req.url}>
          <App serverData={data} />
        </StaticRouter>
      </CacheProvider>
    );

    const emotionChunks = extractCriticalToChunks(reactApp);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);

    const serializedData = serialize(data);

    let html = await fs.readFile(path.resolve('./dist/template.html'), 'utf8');

    html = html.replace('</head>', `<style>${emotionCss}</style></head>`);

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${reactApp}</div>`
    );

    html = html.replace(
      '<script>window.__INITIAL_DATA__ = null;</script>',
      `<script>window.__INITIAL_DATA__ = ${serializedData};</script>`
    );

    res.send(html);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
