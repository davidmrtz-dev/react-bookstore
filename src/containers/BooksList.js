/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { bookActions } from '../actions';
import CategoryFilter from '../components/CategoryFilter';

const mapStateToProps = ({ books, filter }) => ({
  books,
  filter,
});
const {
  fetchBookData,
  removeBook,
  changeFilter,
  updateBookProgress,
} = bookActions;
const mapDispatchToProps = dispatch => ({
  fetchBookData: () => dispatch(fetchBookData()),
  removeBook: id => dispatch(removeBook(id)),
  changeFilter: filter => dispatch(changeFilter(filter)),
  updateBookProgress: (id, progress) =>
    dispatch(updateBookProgress(id, progress)),
});

const BookList = ({
  books = {},
  filter,
  fetchBookData,
  removeBook,
  changeFilter,
  updateBookProgress,
}) => {
  const handleRemoveBook = id => {
    removeBook(id);
  };

  const handleUpdateProgress = (e, id, progress) => {
    e.preventDefault();
    updateBookProgress(id, progress.toString());
  };

  const { booksList } = books;
  const _books = booksList.reduce((result, e) => {
    if (filter === 'All' || e.category === filter) {
      result.push(
        <Book
          book={{ ...e, progress: e.progress.toString() }}
          updateProgress={handleUpdateProgress}
          key={e.title}
          removeBook={handleRemoveBook}
        />,
      );
    }
    return result;
  }, []);

  return (
    <>
      <div>
        <h1 className="bookstore-title">Bookstore CMS</h1>
      </div>
      <CategoryFilter filter={filter} changeFilter={changeFilter} />
      <div className="book-list">{_books}</div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

BookList.propTypes = {
  books: PropTypes.exact({
    loading: PropTypes.bool,
    booksList: PropTypes.array,
  }).isRequired,
  fetchBookData: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
};
