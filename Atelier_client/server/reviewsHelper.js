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
    sendToClient(error)
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

}

module.exports = {
  getReviews,
  getMetaData
}