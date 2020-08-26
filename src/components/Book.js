/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, handleRemoveBook }) => (
  <tr>
    <td className="book-info">
      <div className="id">{book.id}</div>
      <div className="title">{book.title}</div>
      <div>{book.author}</div>
      <div>{book.pages}</div>
      <div>{book.progress}</div>
      <div className="category">{book.category}</div>
      <div className="remove">
        <button type="button" onClick={handleRemoveBook}>
          Remove
        </button>
      </div>
    </td>
  </tr>
);

export default Book;

Book.propTypes = {
  book: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pages: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};
