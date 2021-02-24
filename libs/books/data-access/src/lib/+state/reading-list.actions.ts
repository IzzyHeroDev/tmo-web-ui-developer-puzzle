import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load reading list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListFailure = createAction(
  '[Reading List API] Load reading list failure',
  props<{ error: any }>()
);

export const addToReadingList = createAction(
  '[Reading List API] Add to reading list',
  props<{ book: Book, fromSnackbar?: boolean }>()
);

export const addToReadingListSuccess = createAction(
  '[Reading List API] Add to reading list success',
  props<{ book: Book }>()
);

export const addToReadingListFromSnackbar = createAction(
  '[Reading List API] Add to reading list from snackbar',
  props<{ book: Book, fromSnackbar?: boolean }>()
);

export const addToReadingListFailure = createAction(
  '[Reading List API] Add to reading list failure',
  props<{ error: any }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from reading list',
  props<{ item: ReadingListItem, fromSnackbar?: boolean }>()
);

export const removeFromReadingListSuccess = createAction(
  '[Reading List API] Remove from reading list Success',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFromSnackbar = createAction(
  '[Reading List] Remove from reading list from snackbar',
  props<{ item: ReadingListItem, fromSnackbar?: boolean }>()
);

export const removeFromReadingListFailure = createAction(
  '[Reading List API] Remove from reading list Failure',
  props<{ error: any }>()
);

export const showAddingSnackbar = createAction(
  '[Reading List] Show Adding Snackbar',
  props<{ book: Book }>()
);


export const showRemovingSnackbar = createAction(
  '[Reading List] Show Removing Snackbar',
  props<{ item: ReadingListItem }>()
);
