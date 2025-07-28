// global-setup.ts
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = process.env.BASE_URL!;
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  await page.goto(`${baseUrl}/login`);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for successful login
  await page.waitForURL(`${baseUrl}/`)
  
  // Save login state to file
  await page.context().storageState({ path: './storage/storageState.json' });

  await browser.close();
}

export default globalSetup;
