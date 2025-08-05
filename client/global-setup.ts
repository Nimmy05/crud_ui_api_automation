import { chromium, expect, Locator } from '@playwright/test';
import { constants } from 'globalConfig/constants';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = process.env.REACT_BASE_URL || 'http://localhost:3000';
  const emailText = process.env.USER_EMAIL || 'test67@gmail.com';
  const passwordText = process.env.USER_PASSWORD || 'abc123';

  await page.goto(`${baseURL}/login`);

  const email: Locator = page.locator(`input[type='email']`);
  const password: Locator = page.locator(`input[type='password']`);
  const login: Locator = page.locator(`button[type='submit']`);

  await email.waitFor({state: "visible"});
  await email.fill(emailText);
  await password.waitFor({state: "visible"});
  await password.fill(passwordText);
  await login.waitFor({state: "visible"});
  await login.click();

  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`)).toBeVisible({ timeout: 10000 });


  const storagePath = path.resolve(__dirname, './storage/storageState.json');
  await context.storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
