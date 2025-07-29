import { Locator, Page, expect } from '@playwright/test';
import { byAriaLabel } from 'utils/locatorUtils';


export const button = {
  async clickOnButton(buttonLocator: Locator) {
    await buttonLocator.click();
  }
};

export const inputField = {
  async fill(inputFieldLocator: Locator, value: string) {
    await inputFieldLocator.fill(value);
  }
};

/**
 * Clears one or both form fields.
 *
 * @param email - Optional email field locator
 * @param password - Optional password field locator
 */
export const resetFormFields = async (
  {
    email,
    password,
  }: { email?: Locator; password?: Locator }
): Promise<void> => {
  if (email) {
    await email.fill('');
  }
  if (password) {
    await password.fill('');
  }
};

export const closeAlert = async (page: Page) => {
  const closeButton = byAriaLabel(page, 'button', 'close').first();
  await button.clickOnButton(closeButton);
};

export const verifyAndCloseAlert = async (page: Page, alertText: string) => {
  await expect(page.getByText(alertText)).toBeVisible();
  await closeAlert(page);
};



