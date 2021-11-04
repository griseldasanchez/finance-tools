const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('../database/connect.js');

app.get('/loans', (req, res) => {
  db.client.query(`SELECT * FROM loans` , (err, data) => {
    if (err) {
      // console.log('error in /loans');
      res.send(err);
    } else {
      console.log('data in /loans', data.rows);
      res.send(data.rows);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});