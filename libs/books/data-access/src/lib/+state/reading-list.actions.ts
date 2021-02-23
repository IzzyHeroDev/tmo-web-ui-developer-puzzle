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
  props<{ book: Book }>()
);

export const addToReadingListSuccess = createAction(
  '[Reading List API] Add to reading list success',
  props<{ item: ReadingListItem }>()
);

export const addToReadingListFailure = createAction(
  '[Reading List API] Add to reading list failure',
  props<{ error: any }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from reading list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSuccess = createAction(
  '[Reading List API] Remove from reading list Success',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFailure = createAction(
  '[Reading List API] Remove from reading list Failure',
  props<{ error: any }>()
);

export const markAsRead = createAction(
  '[Reading List] Mark book as read',
  props<{ item: ReadingListItem }>()
);

export const markAsReadSuccess = createAction(
  '[Reading List API] Mark book as read Success',
  props<{ bookId: string }>()
);

export const markAsReadFailure = createAction(
  '[Reading List API] Mark book as read Failure',
  props<{ error: any }>()
);

export const loadReadingListItem = createAction(
  '[Reading List] Load reading list item',
  props<{ bookId: string }>()
);

export const loadReadingListItemSuccess = createAction(
  '[Reading List API] Load reading list item Success',
  props<{ item: ReadingListItem }>()
);

export const loadReadingListItemFailure = createAction(
  '[Reading List API] Load reading list item Failure',
  props<{ error: any }>()
);

