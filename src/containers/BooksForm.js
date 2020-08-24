/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';

const BooksForm = ({ books }) => (
  <form>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" />
    <label htmlFor="category">Category</label>
    <input list="category-list" />
    <datalist id="category-list">
      <option value="Action" />
      <option value="Biography" />
      <option value="History" />
      <option value="Horror" />
      <option value="Kids" />
      <option value="Learning" />
      <option value="Sci-Fi" />
    </datalist>
  </form>
);

export default BooksForm;

BooksForm.propTypes = {
  books: PropTypes.array.isRequired,
};
