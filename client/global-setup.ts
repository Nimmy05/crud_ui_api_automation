import { chromium, expect } from '@playwright/test';
import { writeFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const email = process.env.TEST_USER_EMAIL || 'test67@gmail.com';
  const password = process.env.TEST_USER_PASSWORD || 'abc123';

  await page.goto(`${baseURL}/login`);

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // 🟡 Option 1: Wait for a success toast (react-toastify)
  const successToast = page.locator('.Toastify__toast--success');
  if (await successToast.isVisible({ timeout: 3000 })) {
    await expect(successToast).toBeVisible();
  }

  // ✅ Ensure that dashboard is loaded (adjust as per your app)
  await expect(page.getByRole('heading', { name: 'Todo List' })).toBeVisible();

  // ✅ Save login state
  const storagePath = path.resolve(__dirname, './storage/storageState.json');
  await context.storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
