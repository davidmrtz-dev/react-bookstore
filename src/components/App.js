import React from 'react';
import BookList from '../containers/BooksList';
import BooksForm from '../containers/BooksForm';
import './App.scss';

const App = () => (
  <main className="App">
    <BookList />
    <BooksForm />
  </main>
);

export default App;
