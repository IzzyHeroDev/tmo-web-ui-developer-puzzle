import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books$ = this.store.select(getAllBooks);

  searchForm = this.formBuilder.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchValueChanges();
  }

  searchValueChanges(): void {
    this.searchForm.controls.term.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap((value: string) => {
          this.searchBooks(value);
        }),
      )
      .subscribe();
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
  }

  private searchBooks(term: string): void {
    this.searchForm.value.term ?
      this.store.dispatch(searchBooks({ term: term })) :
      this.store.dispatch(clearSearch());
  }
}
