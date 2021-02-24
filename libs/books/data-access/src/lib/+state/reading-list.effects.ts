import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      switchMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListFailure({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap((action) =>
        this.http.post('/api/reading-list', action.book).pipe(
          switchMap((book: Book) =>
            from([
              ReadingListActions.addToReadingListSuccess({ book }),
              ReadingListActions.showAddingSnackbar({ book }),
            ])
          ),
          catchError((error) =>
            of(ReadingListActions.addToReadingListFailure({ error }))
          )
        )
      )
    )
  );

  showAddingSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.showAddingSnackbar),
      mergeMap((action) =>
        this.matSnackBar
          .open(`Added ${action.book.title} to the reading list`, 'Undo', {
            duration: 2000,
          })
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.removeFromReadingListFromSnackbar({
                item: {
                  ...action.book,
                  bookId: action.book.id,
                } as ReadingListItem,
              })
            )
          )
      )
    )
  );

  addBookFromSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingListFromSnackbar),
      concatMap((action) =>
        this.http.post('/api/reading-list', action.book).pipe(
          map((book: Book) => ReadingListActions.addToReadingListSuccess({ book })),
          catchError((error) =>
            of(ReadingListActions.addToReadingListFailure({ error }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap((action) =>
        this.http.delete(`/api/reading-list/${action.item.bookId}`).pipe(
          switchMap(() => {
            console.log(action);
            return from([
              ReadingListActions.removeFromReadingListSuccess({ item: action.item }),
              ReadingListActions.showRemovingSnackbar({ item: action.item })
            ])
          }),
          catchError((error: any) =>
            of(ReadingListActions.removeFromReadingListFailure({ error }))
          )
        )
      )
    )
  );

  showRemovingSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.showRemovingSnackbar),
      mergeMap((action) =>
        this.matSnackBar
          .open(`Removed ${action.item.title} from the reading list`, 'Undo', {
            duration: 2000,
          })
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.addToReadingListFromSnackbar({ book: { ...action.item, id: action.item.bookId } as Book })
            )
          )
      )
    )
  );

  removeBookFromSnackbar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingListFromSnackbar),
      concatMap((action) =>
        this.http.delete(`/api/reading-list/${action.item.bookId}`).pipe(
          map(() => ReadingListActions.removeFromReadingListSuccess({ item: action.item })),
          catchError((error: any) =>
            of(ReadingListActions.removeFromReadingListFailure({ error }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) {}
}
