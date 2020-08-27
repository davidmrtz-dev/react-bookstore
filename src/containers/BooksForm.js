/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBook } from '../actions';
import categories from '../tools/categories';
import randomId from '../tools/randomId';

const mapStateToProps = ({ books }) => ({ books });
const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book)),
});

const BooksForm = ({ createBook }) => {
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    pages: '',
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
    if (!book.author) _errors.author = 'Author is required';
    if (!book.category) _errors.category = 'Category is required';
    if (!book.pages) _errors.pages = 'Number of pages is required';

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!formIsValid()) return;

    createBook({
      id: randomId(),
      ...book,
      progress: '1',
    });
    setBook({
      title: '',
      author: '',
      category: '',
      pages: '',
    });
  };

  let wrapperClass = 'form-group';
  if (errors.length > 0) {
    wrapperClass += 'has-error';
  }

  const options = categories.map(cat => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ));

  return (
    <div className="form-container">
      <div className="line" />
      <h2>Add New Book</h2>
      <div className="form">
        <div className={wrapperClass}>
          <input
            placeholder="Book name"
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            className="book-input"
          />
          {errors.title && (
            <div className="alert alert-danger">{errors.title}</div>
          )}
        </div>

        <div className={wrapperClass}>
          <input
            placeholder="Book author"
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            className="book-input"
          />
          {errors.author && (
            <div className="alert alert-danger">{errors.author}</div>
          )}
        </div>

        <div className={wrapperClass}>
          <input
            placeholder="Number of pages"
            type="number"
            name="pages"
            id="pages"
            value={book.pages}
            onChange={handleChange}
            className="book-input"
          />
          {errors.pages && (
            <div className="alert alert-danger">{errors.pages}</div>
          )}
        </div>

        <div className={wrapperClass}>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={book.category || ''}
            className="category-select"
          >
            <option value="" disabled>
              Category
            </option>
            {options}
          </select>
          {errors.category && (
            <div className="alert alert-danger">{errors.category}</div>
          )}
        </div>
      </div>
      <button className="submit-button" type="submit" onClick={handleSubmit}>
        Add Book
      </button>
    </div>
  );
};

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
