import {
  CREATE_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_PROGRESS,
} from '../actions/index';

const book = (state, action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return {
        ...action.book,
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

const books = (state = [], action) => {
  switch (action.type) {
    case CREATE_BOOK:
      return [...state, book(undefined, action)];
    case UPDATE_BOOK_PROGRESS:
      return state.map(b => book(b, action));
    case REMOVE_BOOK:
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};

export default books;
