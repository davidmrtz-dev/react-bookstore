/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';

const exampleLib = [
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Example 2',
    category: 'Classic literature',
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Example 2',
    categry: 'Sci-Fi',
  },
  {
    id: Math.floor(Math.random() * 1000),
    title: 'Example 3',
    category: 'Learning',
  },
];

const store = createStore(reducers, {
  books: exampleLib,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
