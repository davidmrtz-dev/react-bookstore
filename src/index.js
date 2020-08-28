/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import reducers from './reducers';
import randomId from './tools/randomId';
import booksMiddleware from './middlewares/booksMiddleware';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(booksMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
