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
  const handleRemoveBook = id => {
    removeBook(id);
  };

  const handleUpdateProgress = (e, id, progress) => {
    e.preventDefault();
    updateBookProgress(id, parseInt(progress, 10).toString());
  };

  const { booksList } = books;
  const _books = booksList.reduce((result, e, i) => {
    if (filter === 'All' || e.category === filter) {
      result.push(
        <Book
          book={{ index: i, ...e }}
          updateProgress={handleUpdateProgress}
          key={e.id}
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
  removeBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
};
