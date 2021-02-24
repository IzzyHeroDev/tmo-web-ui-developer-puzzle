import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Book, ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      switchMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map(data => ReadingListActions.loadReadingListSuccess({ list: data })),
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
      concatMap(action =>
        this.http.post('/api/reading-list', action.book).pipe(
          map((item: ReadingListItem) => ReadingListActions.addToReadingListSuccess({ item })),
          catchError(error =>
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
          map((item: ReadingListItem) =>
            ReadingListActions.removeFromReadingListSuccess({ item })
          ),
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

  constructor(private actions$: Actions, private http: HttpClient) {}
}
