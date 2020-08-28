/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { bookActions } from '../actions';
import Loader from '../components/Loader';
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
  fetchBookData,
  books,
  filter,
  removeBook,
  updateBookProgress,
  changeFilter,
}) => {
  const { booksList, loading } = books;

  const handleRemoveBook = id => {
    removeBook(id);
    //debugger;
  };

  const handleUpdateProgress = (e, id, progress) => {
    e.preventDefault();
    updateBookProgress(id, progress.toString());
  };

  useEffect(() => {
    if (booksList.length === 0) {
      fetchBookData();
    }
  }, [booksList, fetchBookData]);

  const _books = booksList.reduce((result, e) => {
    if (filter === 'All' || e.category === filter) {
      result.push(
        <Book
          book={{
            ...e,
            id: e.id.toString(),
            progress: e.progress.toString(),
          }}
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
      <div className="book-list">
        {loading && <Loader />}
        {_books}
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
  fetchBookData: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
};
