import randomId from '../tools/randomId';

export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const CHANGE_FILTER = 'CHANGE_FILTER';

export const createBook = (
  book = {
    id: randomId(),
    title: '',
    category: '',
  },
) => ({
  type: CREATE_BOOK,
  book,
});

export const removeBook = id => ({
  type: REMOVE_BOOK,
  id,
});

export const changeFilter = filter => ({
  type: CHANGE_FILTER,
  filter,
});
