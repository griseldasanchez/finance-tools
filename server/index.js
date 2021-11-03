const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('../database/connect.js');

app.get('/', (req, res) => {
  res.send('Hello from server!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});