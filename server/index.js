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
  let provider = req.body.provider;
  let term = req.body.term;
  let principal = req.body.principal;
  let remainingBalance = req.body.remainingBalance;
  let interest = req.body.interest;
  let monthlyPayment = req.body.monthlyPayment;
  let paymentDate = req.body.paymentDate;
  db.client.query(`
      INSERT INTO loans (provider,principal,interest,monthlyPayment,term,paymentDate,remainingBalance) 
      VALUES('${provider}', ${principal}, ${interest}, ${monthlyPayment}, ${term}, ${paymentDate}, ${remainingBalance})` 
    , (err, data) => {
    if (err) {
      // console.log('error in post /loans', err);
      res.send(err);
    } else {
      // console.log('data in post /loans', data.rows);
      res.send(data.rows);
    }
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});