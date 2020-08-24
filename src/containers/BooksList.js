/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Book from '../components/Book';

const BookList = ({ books }) => (
  <table>
    <tr>
      <th>Book ID</th>
      <th>Title</th>
      <th>Category</th>
    </tr>
    {books && books.map(book => <Book key={book.id} book={book} />)}
  </table>
);

export default BookList;

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};
