export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const UPDATE_BOOK_PROGRESS = 'UPDATE_BOOK_PROGRESS';
export const CHANGE_FILTER = 'CHANGE_FILTER';

export const createBook = book => ({
  type: CREATE_BOOK,
  book,
});

export const removeBook = id => ({
  type: REMOVE_BOOK,
  id,
});

export const updateBookProgress = (id, progress) => ({
  type: UPDATE_BOOK_PROGRESS,
  id,
  progress,
});

export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  filter,
});
