import { Locator } from '@playwright/test';


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




