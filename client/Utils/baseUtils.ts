import { Locator } from '@playwright/test';
import { timeout } from '../globalConfig/constants';

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
