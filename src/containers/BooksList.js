/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
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

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleUpdateProgress = this.handleUpdateProgress.bind(this);
  }

  handleRemoveBook(id) {
    const { removeBook } = this.props;
    removeBook(id);
  }

  handleUpdateProgress(e, id, progress) {
    e.preventDefault();
    const { updateBookProgress } = this.props;
    updateBookProgress(id, progress.toString());
  }

  componentDidMount() {
    const { fetchBookData } = this.props;
    fetchBookData();
  }

  render() {
    const { books } = this.props;
    const { booksList } = books;
    const { filter } = this.props;

    const _books = booksList.reduce((result, e) => {
      if (filter === 'All' || e.category === filter) {
        result.push(
          <Book
            book={{
              ...e,
              id: e.id.toString(),
              progress: e.progress.toString(),
            }}
            updateProgress={this.handleUpdateProgress}
            key={e.title}
            removeBook={this.handleRemoveBook}
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
        <CategoryFilter
          filter={filter}
          changeFilter={this.props.changeFilter}
        />
        <div className="book-list">{_books}</div>
      </>
    );
  }
}

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
