/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { bookActions } from '../actions';
import CategoryFilter from '../components/CategoryFilter';

const getVisibleBooks = (books, filter) => {
  if (filter !== 'All') {
    const newBooks = books.filter(b => b.category === filter);
    return newBooks;
  }

  return books;
};

const mapStateToProps = ({ books, filter }) => ({
  books,
  filter,
});
const { removeBook, changeFilter, updateBookProgress } = bookActions;
const mapDispatchToProps = dispatch => ({
  removeBook: id => dispatch(removeBook(id)),
  changeFilter: filter => dispatch(changeFilter(filter)),
  updateBookProgress: (id, progress) =>
    dispatch(updateBookProgress(id, progress)),
});

const BookList = ({
  books = {},
  filter,
  removeBook,
  changeFilter,
  updateBookProgress,
}) => {
  const { booksList } = books;
  const activeBooks = getVisibleBooks(booksList, filter);

  const handleRemoveBook = id => {
    removeBook(id);
  };

  const handleUpdateProgress = (e, id, progress) => {
    e.preventDefault();
    updateBookProgress(id, parseInt(progress, 10).toString());
  };

  return (
    <>
      <div>
        <h1 className="bookstore-title">Bookstore CMS</h1>
      </div>
      <CategoryFilter filter={filter} changeFilter={changeFilter} />
      <div className="book-list">
        {activeBooks.map(book => (
          <Book
            key={book.title}
            book={book}
            removeBook={handleRemoveBook}
            updateProgress={handleUpdateProgress}
          />
        ))}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

BookList.propTypes = {
  books: PropTypes.exact({
    loading: PropTypes.bool,
    booksList: PropTypes.array,
  }).isRequired,
  removeBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
};
