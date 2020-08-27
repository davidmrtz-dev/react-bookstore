/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { removeBook, changeFilter, updateBookProgress } from '../actions';
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
const mapDispatchToProps = dispatch => ({
  removeBook: id => dispatch(removeBook(id)),
  changeFilter: filter => dispatch(changeFilter(filter)),
  updateBookProgress: (id, progress) =>
    dispatch(updateBookProgress(id, progress)),
});

const BookList = ({
  books = [],
  filter,
  removeBook,
  changeFilter,
  updateBookProgress,
}) => {
  const [book, setBook] = useState({
    id: '',
    progress: '',
  });
  const activeBooks = getVisibleBooks(books, filter);

  const handleChangeProgress = ({ target }) => {
    setBook({
      ...book,
      id: target.id,
      progress: target.value,
    });
  };

  const handleUpdateSubmit = event => {
    event.preventDefault();
    updateBookProgress(book.id, parseInt(book.progress, 10).toString());
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
            handleRemoveBook={() => {
              removeBook(book.id);
            }}
            onUpdateProgress={handleUpdateSubmit}
            onChangeProgress={handleChangeProgress}
          />
        ))}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);

BookList.defaultProps = {
  books: [],
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  removeBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  updateBookProgress: PropTypes.func.isRequired,
};
