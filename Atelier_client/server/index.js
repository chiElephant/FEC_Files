require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/', (req, res) => {
  res.send('This is our express server for FEC');
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})