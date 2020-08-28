import { bookActionsNames } from '../actions/index';

const {
  FETCH_BOOK_DATA,
  ADD_BOOK_DATA,
  CREATE_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_PROGRESS,
} = bookActionsNames;

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

const defaultState = {
  loading: false,
  booksList: [],
};

const books = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_BOOK_DATA:
      return {
        ...state,
        loading: true,
      };
    case ADD_BOOK_DATA: {
      const book = action.data.map(e => ({
        id: e.id,
        title: e.title,
        author: e.author,
        category: e.category,
        pages: e.pages,
        progress: e.progress,
      }));

      return {
        loading: false,
        booksList: book,
      };
    }
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
