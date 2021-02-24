import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    // mat-badge-content-0
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('should undo removing a book from the reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('Don Quijote de la Mancha');
    await form.submit();

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="book-item"]'))
    );

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="add-book-button"]'))
    );

    const firstBookButton = await $$(
      '[data-testing="add-book-button"]'
    ).first();

    expect(firstBookButton).toBeDefined;
    await firstBookButton.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="reading-list"]'))
    );

    const readingListItems = $$('[data-testing="reading-list"]');
    expect(readingListItems).toBeDefined;

    const initialReadingListItemsCount = (await readingListItems).length;

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="remove-item-button"]'))
    );

    browser.ignoreSynchronization = true;

    const firstRemoveBookButton = await $$(
      '[data-testing="remove-item-button"]'
    ).first();
    expect(firstRemoveBookButton).toBeDefined;
    await firstRemoveBookButton.click();

    const newReadingListItems = await $$('[data-testing="reading-list"]');
    expect(newReadingListItems).toBeDefined;

    const newReadingListItemsCount = newReadingListItems.length;

    expect(initialReadingListItemsCount).toBeGreaterThan(
      newReadingListItemsCount
    );

    const snackbarButton = await element(
      by.tagName('simple-snack-bar')
    ).element(by.tagName('button'));
    expect(snackbarButton).toBeDefined;
    await snackbarButton.click();

    const finalReadingListItems = await $$('[data-testing="reading-list"]');
    expect(finalReadingListItems).toBeDefined;

    const finalReadingListItemsCount = newReadingListItems.length;

    expect(newReadingListItemsCount).toBe(
      finalReadingListItemsCount
    );

    browser.ignoreSynchronization = false;
  });
});
