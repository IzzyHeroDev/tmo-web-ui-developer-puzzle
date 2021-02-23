import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const input = await $('input[type="search"]');
    await input.sendKeys('java');

    await $$('[data-testing="book-item"]');

    const firstTitle = await $$('[data-testing="book-item-title"]').first();
    expect(firstTitle).toBeDefined;
    expect(firstTitle.getText()).toBe('Java 2: Lenguaje y Aplicaciones');

    await input.sendKeys('script');

    await $$('[data-testing="book-item"]');

    const secondTitle = await $$('[data-testing="book-item-title"]').first();

    expect(secondTitle).toBeDefined;
    expect(secondTitle.getText()).toBe('Domine JavaScript. 3ª Edición');
  });
});
