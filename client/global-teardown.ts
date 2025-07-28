// global-teardown.ts
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

async function globalTeardown() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState: './storage/storageState.json' });
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL!;

  await page.goto(`${baseUrl}/`);

  // Click the logout button
  await page.click('text=Logout');

  // Optionally verify you're back at the login page
  await page.waitForURL(`${baseUrl}/login`, { timeout: 5000 });

  console.log('(logout) completed.');

  await browser.close();
}

export default globalTeardown;
