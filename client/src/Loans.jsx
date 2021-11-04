import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Loans() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get('/loans')
      .then(response => setLoans(response.data))
      .catch(err => err)
  }, [])

  return (
    <div>
      <table className="loans-table">
        <tr>
          <th className="loans-table-header">ID#</th>
          <th className="loans-table-header">Provider</th>
          <th className="loans-table-header">Term in Years</th>
          <th className="loans-table-header">Principal</th>
          <th className="loans-table-header">Interest</th>
          <th className="loans-table-header">Monthly Payment</th>
        </tr>
        {loans.map((loan, index) => (
          <tr key={index}>
              <td className="loans-table-header">{loan.loanid}</td>
              <td className="loans-table-header">{loan.provider}</td>
              <td className="loans-table-header">{loan.term} years</td>
              <td className="loans-table-header">${loan.principal}</td>
              <td className="loans-table-header">{loan.interest}%</td>
              <td className="loans-table-header">${loan.monthlypayment}</td>
            </tr>
        ))}
      </table>
    </div>
  );
}

export default Loans;