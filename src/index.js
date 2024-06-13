import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);
