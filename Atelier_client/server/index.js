require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';
const axios = require('axios');
const reviewsHelper = require('./reviewsHelper.js')

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json({limit: '50mb'}));


app.get('/', (req, res) => {
  res.send('This is our express server for FEC');
})

/////////////// OVERVIEW COMPONENT //////////////////////

app.get('/products/:id', (req, res) => {
  console.log(`Received a get request to get the prodcut information for product: ${req.params.id} and  url: ${req.url}`);
  axios.get(url + req.url, {
    headers: {
      Authorization: process.env.GIT
    }
  }).then((product_info) => {
    console.log('This is the product info: ', product_info.data);
    res.send(product_info.data);
  })

})


app.get('/products/:id/styles', (req, res) => {
  axios.get(url + req.url, {
    headers: {
      Authorization: process.env.GIT
    }
  }).then((product_styles) => {
    console.log('These are the product styles: ', product_styles.data);
    res.send(product_styles.data);
  });
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