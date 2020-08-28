/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import reducers from './reducers';
import booksMiddleware from './middlewares/booksMiddleware';

const exampleLibVoid = [];

const exampleRefactored = {
  loading: false,
  booksList: exampleLibVoid,
};

const store = createStore(
  reducers,
  {
    books: exampleRefactored,
    filter: 'All',
  },
  composeWithDevTools(applyMiddleware(booksMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
