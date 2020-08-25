/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';

const mapStateToProps = ({ books }) => ({ books });

const BookList = ({ books }) => (
  <table>
    <thead>
      <tr>
        <th>Book ID</th>
        <th>Title</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {books && books.map(book => <Book key={book.id} book={book} />)}
    </tbody>
  </table>
);

export default connect(mapStateToProps, null)(BookList);

BookList.defaultProps = {
  books: [],
};

BookList.propTypes = {
  books: PropTypes.array,
};
