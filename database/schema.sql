-- Create Database
DROP DATABASE IF EXISTS finance;
CREATE DATABASE finance;
\c finance;

-- Table 'Product Info'
DROP TABLE IF EXISTS Loans;
CREATE TABLE Loans (
  loanid            SERIAL    UNIQUE    PRIMARY KEY,
  provider          VARCHAR   NOT NULL,
  principal         DECIMAL   NOT NULL,
  remainingBalance  DECIMAL NOT NULL,
  interest          DECIMAL   NOT NULL,
  monthlyPayment    DECIMAL   NOT NULL,
  term              DECIMAL   NOT NULL,
  paymentDate       INTEGER   NOT NULL
);

\COPY Loans(provider,principal,remainingBalance,interest,monthlyPayment,term,paymentDate) FROM './data/loans.csv' DELIMITER ',' CSV HEADER;