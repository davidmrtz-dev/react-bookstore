/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, handleRemoveBook, handleUpdateProgress }) => {
  const { title, category, author, pages, progress } = book;
  const [updateForm, toggleForm] = useState(false);
  const displayNone = updateForm ? { display: 'flex' } : { display: 'none' };

  return (
    <div className="book-container">
      <div className="book-info">
        <header>
          <span className="category">{category}</span>
          <h3 className="title" title={title}>
            {title}
          </h3>
          <span className="author">{author}</span>
        </header>
        <footer className="bottom-container">
          <button className="book-button" type="button">
            Edit
          </button>
          <span className="divider" />
          <button
            className="book-button"
            onClick={handleRemoveBook}
            type="button"
          >
            Remove
          </button>
        </footer>
      </div>
      <span className="divider" />
      <div className="display-progress">
        <svg>
          <circle className="progress-circle" cx="30" cy="30" r="30" />
          <circle className="progress-circle" cx="30" cy="30" r="30" />
        </svg>
        <div className="percent-container">
          <span className="number">1 &#37;</span>
          <span className="completed">Completed</span>
        </div>
      </div>
      <span className="divider" />
      <div className="update-progress">
        <span className="page-label">Current page</span>
        <span className="page">{`Page ${progress} of ${pages}`}</span>
        <form
          style={displayNone}
          className="update-page"
          onSubmit={handleUpdateProgress}
        >
          <input type="number" placeholder="pages" min="1" max={pages} />
          <button type="submit">Update</button>
        </form>
        <button
          onClick={() => toggleForm(!updateForm)}
          className="update-btn"
          type="button"
        >
          Update progress
        </button>
      </div>
    </div>
  );
};

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
  handleUpdateProgress: PropTypes.func.isRequired,
};
