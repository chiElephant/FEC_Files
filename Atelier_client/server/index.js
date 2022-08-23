require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const reviewsHelper = require('./reviewsHelper.js')

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
  res.send('This is our express server for FEC');
})

app.get('/reviews', (req, res) => {
  reviewsHelper.getReviews(req.query, (err, data) => {
    err ? res.json(err) : res.json(data)
  })
})

app.post('/reviews', (req, res) => {
  reviewsHelper.postReview(req.body, (err, data) => {
    err ? res.json(err) : res.json(data)
  })
})

app.get('/reviews/meta', (req, res) => {
  reviewsHelper.getMetaData(req.query, (err, data) => {
    err ? res.json(err) : res.json(data)
  })
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})