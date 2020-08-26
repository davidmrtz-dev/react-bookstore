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
    author: 'Homer',
    title: 'Odyssey',
    category: 'Classic literature',
  },
  {
    id: randomId(),
    author: 'Isaac Asimov',
    title: 'I, Robot',
    category: 'Sci-Fi',
  },
  {
    id: randomId(),
    author: 'David Garcia',
    title: 'Learning Python',
    category: 'Learning',
  },
];

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
