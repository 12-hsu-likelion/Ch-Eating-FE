import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from "./Redux/store.js";
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </Provider>
  /* </React.StrictMode>, */
)