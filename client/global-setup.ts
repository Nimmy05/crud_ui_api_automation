import 'tsconfig-paths/register';
import { timeout } from 'globalConfig/constants';
import { chromium, expect } from '@playwright/test';
import { config } from 'dotenv';

config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = process.env.REACT_BASE_URL!;
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  page.getByRole('button', { name: 'Login' }).click();

  const alerts = page.getByRole('alert');
  const loginAlert = alerts.filter({ hasText: `${email} is Logged In` }).first();
  await expect(loginAlert).toBeVisible();

  await page.waitForURL(`${baseUrl}/`)

  await page.context().storageState({ path: './storage/storageState.json' });

  await browser.close();
}

export default globalSetup;
