/* eslint-disable no-underscore-dangle */
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
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({
    title: '',
    category: '',
  });

  const handleChange = ({ target }) => {
    setBook({
      ...book,
      [target.name]: target.value,
    });
  };

  const formIsValid = () => {
    const _errors = {};

    if (!book.title) _errors.title = 'Title is required';
    if (!book.category) _errors.category = 'Category is required';

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    createBook({
      id: Math.floor(Math.random() * 1000),
      title: book.title,
      category: book.category,
    });
    setBook({
      title: '',
      category: '',
    });
  };

  let wrapperClass = 'form-group';
  if (errors.length > 0) {
    wrapperClass += 'has-error';
  }

  return (
    <>
      <div className={wrapperClass}>
        <label htmlFor="title">Title</label>
        <div className="field">
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        {errors.title && (
          <div className="alert alert-danger">{errors.title}</div>
        )}
      </div>

      <div className={wrapperClass}>
        <label htmlFor="category">Category</label>
        <div className="field">
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
        </div>
        {errors.category && (
          <div className="alert alert-danger">{errors.category}</div>
        )}
      </div>
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
