const axios = require('axios');
const config = require('../config.js');
const express = require('express');

const endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`;
const metaEndpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/`
const token = config.Token;

const getReviews = (query, sendToClient) => {

  const options = {
    headers: {Authorization: token},
    params: query
  }

  axios.get(endpoint, options)
  .then(response => {
    sendToClient(response.data.results)
  })
  .catch(error => {
    sendToClient('Error fetching from API: ', error)
  })
}

const getMetaData = (query, sendToClient) => {

  const options = {
    headers: {Authorization: token},
    params: query
  }

  axios.get(metaEndpoint, options)
  .then(res => {
    sendToClient(res.data)
  })
  .catch(error => {
    sendToClient('Error fetching from API: ', error)
  })

}

const postReview = (body, sendToClient) => {

  const options = {
    headers: {Authorization: token},
    data: body
  }

  axios.post(endpoint, options)
  .then(res => {
    sendToClient(res.data)
  })
  .catch(error => {
    sendToClient('Error posting to API: ', error)
  })

}

module.exports = {
  getReviews,
  getMetaData,
  postReview
}