/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBook } from '../actions';

const categories = [
  'Action',
  'Biography',
  'History',
  'Horror',
  'Kids',
  'Learning',
  'Sci-Fi',
];

const mapStateToProps = ({ books }) => ({ books });
const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book)),
});

const BooksForm = ({ createBook }) => {
  const [book, setBook] = useState({
    id: Math.floor(Math.random() * 1000),
    title: '',
    category: '',
  });

  const handleChange = ({ target }) => {
    setBook({
      ...book,
      [target.name]: target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createBook({ id: book.id, title: book.title, category: book.category });
  };

  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={book.title}
        onChange={handleChange}
      />
      <label htmlFor="category">Category</label>
      <input
        name="category"
        list="category-list"
        value={book.category || ''}
        onChange={handleChange}
      />
      <datalist id="category-list">
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </datalist>
      <button type="submit" onClick={handleSubmit}>
        Add book
      </button>
    </>
  );
};

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
