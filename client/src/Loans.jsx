import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Loans() {

  const [loans, setLoans] = useState([]);
  const [provider, setProvider] = useState('');
  const [term, setTerm] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    axios.get('/loans')
      .then(response => setLoans(response.data))
      .catch(err => err)
  }, [])

  const saveLoan = () => {
    event.preventDefault();
    axios.post('/loans', {
      'provider': provider,
      'term': term,
      'principal': principal,
      'interest': interest,
      'monthlyPayment': monthlyPayment
    })
    axios.get('/loans')
      .then(response => setLoans(response.data))
      .catch(err => err)
  }

  return (
    <div>
      <form>
        <table className="loans-table">
          <thead>
            <th className="loans-table-cell">ID#</th>
            <th className="loans-table-cell">Provider</th>
            <th className="loans-table-cell">Term in Years</th>
            <th className="loans-table-cell">Principal</th>
            <th className="loans-table-cell">Interest</th>
            <th className="loans-table-cell">Monthly Payment</th>
          </thead>
          {loans.map((loan, index) => (
            <tbody key={index}>
              <td className="loans-table-cell">{loan.loanid}</td>
              <td className="loans-table-cell">{loan.provider}</td>
              <td className="loans-table-cell">{loan.term} years</td>
              <td className="loans-table-cell">${loan.principal}</td>
              <td className="loans-table-cell">{loan.interest}%</td>
              <td className="loans-table-cell">${loan.monthlypayment}</td>
            </tbody>
          ))} 
            <td className="loans-table-cell">_</td>
            <td className="loans-table-cell"><input required onChange={(event) => setProvider(event.target.value)}></input></td>
            <td className="loans-table-cell"><input required onChange={(event) => setTerm(event.target.value)}></input></td>
            <td className="loans-table-cell"><input required onChange={(event) => setPrincipal(event.target.value)}></input></td>
            <td className="loans-table-cell"><input required onChange={(event) => setInterest(event.target.value)}></input></td>
            <td className="loans-table-cell"><input required onChange={(event) => setMonthlyPayment(event.target.value)}></input></td>
            <tfoot>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <button onClick={saveLoan} type="submit">Save Loan</button>
            </tfoot>
        </table>
      </form>
    </div>
  );
}

export default Loans;