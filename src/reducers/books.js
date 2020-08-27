import { bookActionsNames } from '../actions/index';

const { CREATE_BOOK, REMOVE_BOOK, UPDATE_BOOK_PROGRESS } = bookActionsNames;

const book = (state, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return {
        ...action.book,
        progress: 1,
      };
    case UPDATE_BOOK_PROGRESS:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};

const defaultState = () => ({
  loading: false,
  booksList: [],
});

const books = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return {
        ...state,
        booksList: [...state.booksList, book(undefined, action)],
      };
    case UPDATE_BOOK_PROGRESS:
      return {
        ...state,
        booksList: [...state.booksList.map(b => book(b, action))],
      };
    case REMOVE_BOOK:
      return {
        ...state,
        booksList: [...state.booksList.filter(book => book.id !== action.id)],
      };
    default:
      return state;
  }
};

export default books;
