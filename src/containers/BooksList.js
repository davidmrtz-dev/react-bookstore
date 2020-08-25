/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import { removeBook, changeFilter } from '../actions';
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
});

const BookList = ({ books = [], filter, removeBook, changeFilter }) => {
  const activeBooks = getVisibleBooks(books, filter);
  return (
    <>
      <CategoryFilter filter={filter} changeFilter={changeFilter} />
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {activeBooks.map(book => (
            <Book
              key={book.id}
              book={book}
              handleRemoveBook={() => {
                removeBook(book.id);
              }}
            />
          ))}
        </tbody>
      </table>
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
};
