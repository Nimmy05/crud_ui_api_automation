import 'tsconfig-paths/register';
import { chromium, expect } from '@playwright/test';
import { config } from 'dotenv';

config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = process.env.REACT_BASE_URL!;
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  // Go to login page
  await page.goto(`${baseUrl}/login`);

  // Fill in credentials
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);


  page.click('button[type="submit"]'),


    await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible();


  // Option 2: Check for dashboard element (replace with a real one from your app)
  await expect(page.locator('h2')).toHaveText('Todo List');

  // Save storage state
  await page.context().storageState({ path: './storage/storageState.json' });

  await browser.close();
}

export default globalSetup;
