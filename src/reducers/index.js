// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import books from './books';
import filter from './filter';

export default combineReducers({ books, filter });
