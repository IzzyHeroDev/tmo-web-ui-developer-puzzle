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

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('`Should mark a reading item as read', async () => {
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

    const firstWantToReadButton = await $$('[data-testing="add-book-to-reading-list-button"]').first();
    expect(firstWantToReadButton).toBeDefined;
    await firstWantToReadButton.click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="not-read-list"]'))
    );
    
    const firstReadButton =  await $$('[data-testing="mark-as-read-button"]').first();
    expect(firstReadButton).toBeDefined;
    await firstReadButton.click();

    await browser.wait(
      ExpectedConditions.presenceOf($('[data-testing="read-list"]'))
    );
    
    const finishList = await $('[data-testing="read-list"]');
    expect(finishList).toBeDefined;

    const firstRmoveButton =  await $$('[data-testing="remove-button"]').first();
    expect(firstRmoveButton).toBeDefined;
    await firstRmoveButton.click();

  });
});
