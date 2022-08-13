const express = require('express');
const app = express();
const port = 3000;

app.get('/', () => {
  res.send('This is our express server for FEC');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})