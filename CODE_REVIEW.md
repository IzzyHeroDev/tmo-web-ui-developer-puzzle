# Books:

## data-access

### books.actions

* Action's categories are different, some start with "__Books__" and others with "__Book__". Since _books_ is a feature module library. It is better to use "__Books__" in all the action's categories to group them better.
* The error property should have a type. This Interface should be added to the __shared/models__ library.
  
### books.effects

* Calling the API inside the _switchMap_ operator in line 15 should be in a service for separation of concerns.
  * The endpoint's url should come from an environment file.

#### books.effects.spec

* The test's assertion name is ambiguous, and it can be more descriptive. e.g. "should load books".

### books.reducers

* The action ```BooksActions.searchBooksFailure``` is not assigning the error to the state's property error on line 41.

#### books.selectors.spec

* The inner _describe_ is unnecessary because the one level above is the same.

### reading-list.actions

* Action's categories are mixed, some contain "__Books__" when they belong to __Reading List__ actions.
* The failure actions _failedAddToReadingList_ and _failedRemoveFromReadingList_ have wrong props on lines 22 and 37. They should have ```props<{ error: any }>()``` instead.
* The error property should have a type. This Interface should be added to the __shared/models__ library.
* As a general rule of NgRx it is better to sufix accions with Success or Failure. Hence, the actions: __loadReadingListError__, __failedAddToReadingList__, __confirmedAddToReadingList__, __removeFromReadingList__, __failedRemoveFromReadingList__, __confirmedRemoveFromReadingList__ should be renamed. e.g. loadReadingListFailure

#### reading-list.effects

* The operator _exhaustMap_ on line 14 for preventing multiple http calls is not needed since loading the reading list from the action _ReadingListActions.init_ happens only once when the _effects_ are initialized.
* Calling the API inside the _switchMap_ operator in line 15 should be in a service for separation of concerns.
  * The endpoint's urls should come from an environment file.
  
#### reading-list.effects.spec

* The test's assertion name is ambiguous, and it can be more descriptive. e.g. "should load books".

### reading-list.reducers

* The reducer on the _ReadingListActions.init_ action is not needed because the _ReadingListPartialState_ has an _initialState_.
* The property _loaded_ could be removed since the reading list is loaded from initialization and no spinners/loading state is shown to the user.
* The reducer for _ReadingListActions.addToReadingList_ action on line 50 should use the _addToReadingListSuccess_ action instead because in case of failure the book will not be added to the reading list.
* The reducer for _ReadingListActions.removeFromReadingList_ action on line 53 should use the _removeFromReadingListSuccess_ action instead because in case of failure the book will not be removed from the reading list.
* Missing reducers for the actions _addToReadingListFailure_ and _removeFromReadingListFailure_.

### reading-list.reducers.spec

* The test description is the same as _Books_, and it should be __Reading List Reducer__ instead.
* The first test's assertion's name is wrong, and it should be __loadReadingListSuccess__
* No tests for _ReadingListActions.loadReadingListFailure_, _ReadingListActions.addToReadingListSuccess_, and _ReadingListActions
* The tests _addToReadingListFailure_ and _removeFromReadingListFailure_ on lines 34 and 44 respectively are broken because they both expect a different array from the one created before each test.

### reading-list.slectors

* On line 35 the variable _b_ is too ambiguous and affects readability. It is better to use more descriptive names for variables. e.g. "book"
    * The ```Boolean(entities[book.id])``` could be changed for ```!!entities[book.id]```. This can be agreed on by the team, and it helps create a standard or a code style guide for the team.
* The _getAllBooks_ selector as well as the ```interface ReadingListBook``` belongs to the _books.reducer_ since it returns the books with a flag for knowing if a book is in the reading list.

### reading-list.slectors.spec

* The _describe_ name on line 37 should say __Reading List Selectors__ instead of _Books Selectors'_.

## feature

* The library name _feature_ is ambiguous. A better name would be _feature-books_. This helps with readability and maintainability while the feature libraries grow.

### book-search.component.ts

* On line 7 there is an unused import.
* On line 35 there is a subscription to a selector's observable, and there is no unsubscribe for it. This could lead to memory leaks. It is better not to subscribe and use the __async__ pipe.
    * Another improvement would be to use the __vm$__ pattern in order to combine all the observables in the component's class.
*  On line 27 the fb is too short of a name and not very descriptive, a better name for it would be __formBuilder__.
* Function ```formatDate``` is not needed. The date can be formatted on the template with Angular's __date__ pipe. However:
   *  The date parameter should be an optional param of type string.
   *  The function is missing a return type. It should be ```: string | undefined```
* The component contains both the search bar, and the books list, and it could be split into two components. This adds better maintainability in case of any changes. For Instance, If the search bar needs to be modified, the code for the books grid would not be touched as it is independant.
* If a search fails the entities from the last successful search are kept in the store.
   
### book-search.component.html

* Button on line 10 is missing ```type="submit"```
* On line 18 the _*ngFor_'s _let_ variable b, should have a more meaningful name to improve readability. A better name would be __book__.

### book-search.component.scss

* Class names should be in __Kebab Case__. e.g. "book-content".
* The grid is missing responsive design.

### reading-list.component.ts

* Function ```removeFromReadingList``` is missing a return type as well as the parameter's type.

### reading-list.component.html

* On line 2 the _*ngFor_'s _let_ variable b, should have a more meaningful name to improve readability. A better name would be __readingListItem__.
* The _authors_ format done by the __join__ function could be done with a custom pipe. It is good practice to do visual formatting via pipes.


## total-count.component.ts

* The class implements the _OnInit_ lifecycle hook, but the implementation is empty. Hence, it could be removed.

### books-feature.module.ts

* ```const EXPORTS``` could have a better name. The Reason being is that the module exports _EXPORTS_ and declares _EXPORTS_, which seems confusing. A better name could be __MODULE_PUBLIC_COMPONENTS__.
    * Not all components from the module have to be exported.
    * If the components in the module grow in number; the __MODULE_PUBLIC_COMPONENTS__ constant could be moved to the shared library.
* Once again, this brings opportunity to the team for negotiating/defining a coding style guide.
* The module is missing a router module.
* This feature module is not being lazily loaded.

## Other Improvements

* Keep monorepo up to date. Both Angular and Nx have the latest versions of tools and libraries in each release.
* Organize imports by module name this could also be in alphabetically descendant ordered.
* The method ```get searchTerm()``` could be omitted because the search term value can be accessed via ```this.searchForm.value.term```.
* The _search term_ could be stored as a route param, so that when refreshing the page the search could auto-populate and get the books on refresh. 
* The shared library modules file will grow too fast. It would be better to have modules organized by feature and in different files related with each other. e.g. books.model.ts, another-feature.model.ts
* e2e switch to Cypress as Nx default uses it as a default option for each project.
* Aria improvements. Some elements are missing the aria-label element. In addition, Use the right HTML element when needed. e.g. Use the ```<button></button>``` element instead of an ```<a>``` when the element acts as a button.
