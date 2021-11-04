import React from 'react';
import Loans from './Loans.jsx';

class App extends React.Component {
  render() {
    return <div>
      <h2>Loan Summary: </h2>
      <Loans />
   </div> 
  }
}

export default App;
