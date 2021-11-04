-- Create Database
DROP DATABASE IF EXISTS finance;
CREATE DATABASE finance;
\c finance;

-- Table 'Product Info'
DROP TABLE IF EXISTS Loans;
CREATE TABLE Loans (
  loanid          SERIAL    UNIQUE    PRIMARY KEY,
  provider        VARCHAR   NOT NULL,
  principal       DECIMAL   NOT NULL,
  interest        DECIMAL   NOT NULL,
  monthlyPayment  DECIMAL   NOT NULL,
  term            DECIMAL   NOT NULL
);

\COPY Loans(provider,principal,interest,monthlyPayment,term) FROM './data/loans.csv' DELIMITER ',' CSV HEADER;