const express = require('express');
const app = express();
const port = 5000;
const path = require('path');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('../database/connect.js');

// Display Loan Records
app.get('/loans', (req, res) => {
  db.client.query(`SELECT * FROM loans` , (err, data) => {
    if (err) {
      // console.log('error in get /loans');
      res.send(err);
    } else {
      // console.log('data in get /loans', data.rows);
      res.send(data.rows);
    }
  })
});

// Add New Loan
app.post('/loans', (req, res) => {
  console.log('body', req.body)
  let provider = req.body.provider;
  let term = req.body.term;
  let principal = req.body.principal;
  let interest = req.body.interest;
  let monthlyPayment = req.body.monthlyPayment;
  db.client.query(`
      INSERT INTO loans (provider,principal,interest,monthlyPayment,term) 
      VALUES('${provider}', ${principal}, ${interest}, ${monthlyPayment}, ${term})` 
    , (err, data) => {
    if (err) {
      // console.log('error in post /loans');
      res.send(err);
    } else {
      console.log('data in post /loans', data.rows);
      console.log('info', data);
      res.send(data.rows);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});