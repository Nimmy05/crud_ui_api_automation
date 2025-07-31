import { chromium } from '@playwright/test';
import { config } from 'dotenv';

config();


async function globalTeardown() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: './storage/storageState.json' });
  const page = await context.newPage();

  const baseUrl = process.env.REACT_BASE_URL!;

  await page.goto(`${baseUrl}/`);

  await page.waitForSelector('text=Logout', { timeout: 10000 });

  await page.click('text=Logout');

  await page.waitForURL(`${baseUrl}/login`, { timeout: 5000 });

  console.log('(logout) completed.');

  await browser.close();
}

export default globalTeardown;
