import { chromium, expect } from '@playwright/test';
import { constants } from 'globalConfig/constants';
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
  // await page.getByRole('button', { name: 'Login' }).click();

//   // 🟡 Option 1: Wait for a success toast (react-toastify)
//   const successToast = page.locator('.Toastify__toast--success');
//   if (await successToast.isVisible({ timeout: 5000 })) {
//   await successToast.waitFor({ state: 'detached', timeout: 10000 }); // wait until it disappears
// }

//   // ✅ Ensure that dashboard is loaded (adjust as per your app)
//    const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);
//   await expect(inputFieldLocator).toBeVisible();

// ✅ Wait for navigation after login
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle' }),
  page.getByRole('button', { name: 'Login' }).click()
]);

  const successToast = page.locator('.Toastify__toast--success');
  if (await successToast.isVisible({ timeout: 5000 })) {
  await successToast.waitFor({ state: 'detached', timeout: 10000 }); // wait until it disappears
}


// ✅ Ensure you're on the correct page
await expect(page).toHaveURL(`${baseURL}/`);

// ✅ Wait for input field to appear
const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);
await expect(inputFieldLocator).toBeVisible({ timeout: 10000 });

  // ✅ Save login state
  const storagePath = path.resolve(__dirname, './storage/storageState.json');
  await context.storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
