import React from 'react';
import ReactDOM from 'react-dom'
import App from './app.jsx';
import Modal from 'react-modal';


Modal.setAppElement('#app');
ReactDOM.render((<App />), document.getElementById('app'));
