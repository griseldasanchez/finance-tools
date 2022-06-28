import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


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
  // clear form fields after new loan submission
  const form = useRef(null);
  // modal variables
  const [modalIsOpen, setIsOpen] = React.useState(false);
    // loan details in modal being edited
    const [loanId, setLoanId] = useState(0);
    const [interestModal, setInterestModal] = useState(0);
    const [monthlyPaymentModal, setMonthlyPaymentModal] = useState(0);
    const [paymentDateModal, setPaymentDateModal] = useState(0);
    const [principalModal, setPrincipalModal] = useState(0);
    const [providerModal, setProviderModal] = useState('');
    const [remainingBalanceModal, setRemainingBalanceModal] = useState(0);
    const [termModal, setTermModal] = useState(0);


  const openModal = (loanId, loanName, loanRemainingBalance) => {
    event.preventDefault();
    console.log('loanId', loanId);
    setIsOpen(true);
    setLoanId(loanId);
    setProviderModal(loanName);
    setRemainingBalanceModal(loanRemainingBalance);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }


  useEffect(() => {
    getUpdatedLoanDetails();
  }, [])
  
  const getUpdatedLoanDetails = () => {
    // render loan table to include updates
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
    form.current.reset();
  }

  const deleteRow = (idToDelete) => {
    event.preventDefault();
    axios.delete(`/loans/${idToDelete}`, { data: idToDelete })
    getUpdatedLoanDetails();
  }
  
  const editRow = (remainingBalance) => {
    event.preventDefault();
    axios.put(`/loans`, { loanId: loanId, remainingBalance: remainingBalance })
    getUpdatedLoanDetails();
  }

  return (
    <div>
      <form ref={form}>
        <table className="loans-table">
          {/* table header */}
          <tbody>
            <tr>
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
              <th className="loans-table-cell">Edit Row</th>
            </tr>
          </tbody>
          {/* display table data */}
          {loans.map((loan, index) => (
            <tbody key={index}>
              <tr>
                <td className="loans-table-cell">{loan.provider}</td>
                <td className="loans-table-cell">{loan.term} years</td>
                <td className="loans-table-cell">${loan.principal}</td>
                <td className="loans-table-cell">${loan.remainingbalance}</td>
                <td className="loans-table-cell">{loan.interest}%</td>
                <td className="loans-table-cell">${loan.monthlypayment}</td>
                <td className="loans-table-cell">{loan.paymentdate}th</td>
                <td className="loans-table-cell">TBD</td>
                <td className="loans-table-cell">TBD</td>
                <td className="loans-table-cell">
                  <button onClick={() => deleteRow(loan.loanid)}>Delete</button>
                </td>
                <td className="loans-table-cell">
                  <button onClick={() => openModal(loan.loanid, loan.provider, loan.remainingbalance)}>Edit Loan</button>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                    >
                      <button onClick={closeModal}>close</button>
                      <h2>Edit {providerModal} Loan: </h2>
                      <form>
                        Remaing Balance: 
                          <input  value={remainingBalanceModal} 
                                  onChange={(event) => setRemainingBalanceModal(event.target.value)}>
                          </input>
                        <button onClick={() => editRow(remainingBalanceModal)}>Update Loan Details</button>
                      </form>
                    </Modal>
                  </td>
              </tr>
            </tbody>
          ))} 
          {/* display table form */}
          <tbody>
            <tr>
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
          <button onClick={saveLoan} type="submit">Save Loan</button>
      </form>
    </div>
  );
}

export default Loans;