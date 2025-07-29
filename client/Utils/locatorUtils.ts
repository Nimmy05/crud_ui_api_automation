import { Page, Locator } from '@playwright/test';

export const getByClassContains = (page: Page, partialClass: string): Locator =>
  page.locator(`a[class*="${partialClass}"]`);

export const byButtonTextIs = (page: Page, buttonText: string): Locator =>
  page.locator(`button:text-is("${buttonText}")`);

export const byInputName = (page: Page, inputName: string): Locator =>
  page.locator(`input[name="${inputName}"]`);


export const byInputValue = (page: Page, inputValue: string): Locator =>
  page.locator(`input[value="${inputValue}"]`);

export const byAriaLabel = (page: Page, tag: string, text: string): Locator => 
page.locator(`${tag}[aria-label='${text}']`);

