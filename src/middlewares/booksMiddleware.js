import { bookActionsNames, bookActions } from '../actions';
import api from '../api/api';

const booksMiddleware = store => next => async action => {
  const { FETCH_BOOK_DATA } = bookActionsNames;

  const { addBookData } = bookActions;

  switch (action.type) {
    case FETCH_BOOK_DATA: {
      next(action);

      try {
        const response = await api.get('/books/');
        const { data } = response;
        store.dispatch(addBookData(data));
      } catch (error) {
        // console.log(error);
      }

      break;
    }

    default:
      next(action);
  }
};

export default booksMiddleware;
