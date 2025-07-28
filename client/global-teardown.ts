import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
import { logout } from './utils/auth'; // ✅ Import logout
dotenv.config();

async function globalTeardown() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: './storage/storageState.json',
  });
  const page = await context.newPage();

  try {
    await page.goto(`${process.env.BASE_URL}/`); // ✅ Ensure navigation before logout
    await logout(page);
  } catch (error) {
    console.error('Logout failed during globalTeardown:', error);
  }

  await browser.close();
}

export default globalTeardown;
