import { Page, Locator } from '@playwright/test';

export const getByClassContains = (page: Page, partialClass: string): Locator =>
  page.locator(`a[class*="${partialClass}"]`);

export const byButtonTextIs = (page: Page, buttonText: string): Locator =>
  page.locator(`button:text-is("${buttonText}")`);

export const byInputName = (page: Page, inputName: string): Locator =>
  page.locator(`input[name="${inputName}"]`);

export const byButtonContainsText = (page: Page, buttonText: string): Locator =>
  page.locator(`button:has-text("${buttonText}")`);

export const byTextFieldId = (page: Page, inputId: string): Locator =>
  page.locator(`input[id="${inputId}"]`);

export const byId = (page: Page, tag: string, Id: string): Locator =>
  page.locator(`${tag}[id="${Id}"]`);

export const byClass = (page: Page, tag: string, className: string): Locator =>
  page.locator(`${tag}[class="${className}"]`);

export const byPartialClass = (page: Page, tag: string, className: string): Locator =>
  page.locator(`${tag}[class*="${className}"]`);

export const byText = (page: Page, tag: string, text: string): Locator => 
  page.locator(`${tag}:text-is("${text}")`);

export const byDataValidation = (page: Page, tag: string, text: string): Locator => 
  page.locator(`${tag}[data-validation-status='${text}']`);

export const byAriaLabel = (page: Page, tag: string, text: string): Locator => 
page.locator(`${tag}[aria-label='${text}']`);

