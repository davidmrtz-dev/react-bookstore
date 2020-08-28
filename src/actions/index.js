export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const UPDATE_BOOK_PROGRESS = 'UPDATE_BOOK_PROGRESS';
export const CHANGE_FILTER = 'CHANGE_FILTER';

export const bookActionsNames = {
  CREATE_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_PROGRESS,
  CHANGE_FILTER,
};

export const bookActions = {
  createBook: book => ({ type: CREATE_BOOK, book }),
  removeBook: id => ({ type: REMOVE_BOOK, id }),
  updateBookProgress: (id, progress) => ({
    type: UPDATE_BOOK_PROGRESS,
    id,
    progress,
  }),
  changeFilter: filter => ({ type: CHANGE_FILTER, filter }),
};
