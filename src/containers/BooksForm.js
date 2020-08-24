/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

const categories = [
  'Action',
  'Biography',
  'History',
  'Horror',
  'Kids',
  'Learning',
  'Sci-Fi',
];

const BooksForm = () => (
  <form>
    <label htmlFor="title">Title</label>
    <input type="text" name="title" id="title" required />
    <label htmlFor="category">Category</label>
    <input list="category-list" />
    <datalist id="category-list">
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </datalist>
    <button type="submit">Add book</button>
  </form>
);

export default BooksForm;
