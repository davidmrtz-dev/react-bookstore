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
      id: randomId(),
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
      <h2 className="book-form-header">Add new book</h2>
      <div id="book-form">
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
              type="text"
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
      </div>
      <div id="category-hint">
        Tip: If the category doesn&apos;t exist in the list, just type it in the
        editor; it will be added to the categories list.
      </div>
    </>
  );
};

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
