/* eslint-disable import/no-extraneous-dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
import randomId from './tools/randomId';

const exampleLib = [
  {
    id: randomId(),
    title: 'Example 2',
    category: 'Classic literature',
  },
  {
    id: randomId(),
    title: 'Example 2',
    category: 'Sci-Fi',
  },
  {
    id: randomId(),
    title: 'Example 3',
    category: 'Learning',
  },
];

const store = createStore(
  reducers,
  {
    books: exampleLib,
    filter: 'All',
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
