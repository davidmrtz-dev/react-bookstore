/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, handleRemoveBook }) => (
  <tr>
    <td className="book-info">
      <div className="id">{book.id}</div>
      <div className="title">{book.title}</div>
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
  book: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};
