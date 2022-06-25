import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Loans() {

  const [loans, setLoans] = useState([]);
  // new loan information for form
  const [interest, setInterest] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [paymentDate, setPaymentDate] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [provider, setProvider] = useState('');
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [term, setTerm] = useState(0);

  useEffect(() => {
    axios.get('/loans')
      .then(response => setLoans(response.data))
      .catch(err => err)
  }, [])

  const getUpdatedLoanDetails = () => {
    // rerender loan table to include new loan
    axios.get('/loans')
      .then(response => setLoans(response.data))
      .catch(err => err)
  }

  const saveLoan = () => {
    event.preventDefault();
    if (provider === '' || term === 0 || principal === 0 || interest === 0 || monthlyPayment === 0 || paymentDate === 0 || remainingBalance === 0) {
      alert('Please fill in missing fields.')
    } else {
      // send new loan information
      axios.post('/loans', {
        'provider': provider,
        'term': term,
        'principal': principal,
        'remainingBalance': remainingBalance,
        'interest': interest,
        'monthlyPayment': monthlyPayment,
        'paymentDate': paymentDate
      })
      getUpdatedLoanDetails();
      resetForm();
    }
  }

  const resetForm = () => {
    // reset variables for form to blank after submission
    console.log('in reset');
    setProvider('new ');
  }

  const deleteRow = (idToDelete) => {
    event.preventDefault();
    axios.delete(`/loans/${idToDelete}`, { data: idToDelete })
    getUpdatedLoanDetails();
  }

  return (
    <div>
      <form>
        <table className="loans-table">
          {/* table header */}
          <tbody>
            <tr>
              <th className="loans-table-cell">ID#</th>
              <th className="loans-table-cell">Provider *</th>
              <th className="loans-table-cell">Term in Years *</th>
              <th className="loans-table-cell">Principal *</th>
              <th className="loans-table-cell">Remaining Balance *</th>
              <th className="loans-table-cell">Interest *</th>
              <th className="loans-table-cell">Monthly Payment *</th>
              <th className="loans-table-cell">Payment Date *</th>
              <th className="loans-table-cell">Daily Interest</th>
              <th className="loans-table-cell">Accrued Interest This Month</th>
              <th className="loans-table-cell">Delete</th>
            </tr>
          </tbody>
          {/* display table data */}
          {loans.map((loan, index) => (
            <tbody key={index}>
              <tr>
                <td className="loans-table-cell">{loan.loanid}</td>
                <td className="loans-table-cell">{loan.provider}</td>
                <td className="loans-table-cell">{loan.term} years</td>
                <td className="loans-table-cell">${loan.principal}</td>
                <td className="loans-table-cell">${loan.remainingBalance}</td>
                <td className="loans-table-cell">{loan.interest}%</td>
                <td className="loans-table-cell">${loan.monthlypayment}</td>
                <td className="loans-table-cell">{loan.paymentdate}th</td>
                <td className="loans-table-cell">TBD</td>
                <td className="loans-table-cell">TBD</td>
                <td className="loans-table-cell">
                  <button onClick={() => deleteRow(loan.loanid)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))} 
          {/* display table form */}
          <tbody>
            <tr>
              <td className="loans-table-cell">_</td>
              <td className="loans-table-cell"><input onChange={(event) => setProvider(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setTerm(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setPrincipal(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setRemainingBalance(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setInterest(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setMonthlyPayment(event.target.value)}></input></td>
              <td className="loans-table-cell"><input onChange={(event) => setPaymentDate(event.target.value)}></input></td>
            </tr>
          </tbody>
        </table>
          <button onClick={saveLoan}>Save Loan</button>
      </form>
    </div>
  );
}

export default Loans;