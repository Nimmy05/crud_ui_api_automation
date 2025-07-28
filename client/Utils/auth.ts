import { Page, expect } from '@playwright/test';

export async function login(page: Page): Promise<boolean> {
  const baseUrl = process.env.BASE_URL!;
  const email = process.env.USER_EMAIL!;
  const password = process.env.USER_PASSWORD!;

  if (!email || !password || !baseUrl) {
    throw new Error('Missing BASE_URL, USER_EMAIL, or USER_PASSWORD in .env');
  }

  await page.goto(`${baseUrl}/login`);
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page.click('button[type=submit]');


  // Wait for toast notification text like: "<email> is Logged In"

  await expect(page.locator('.Toastify__toast')).toHaveText(`${email} is Logged In`, { timeout: 3000 });


  // Wait for URL to change to baseUrl root after 1.5s redirect delay
  await page.waitForFunction(
    url => window.location.href.startsWith(url),
    `${baseUrl}/`,
    { timeout: 5000 }
  );

  // Now wait for the heading that confirms landing on Todo List page
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Todo List', { timeout: 5000 });

  return page.url().startsWith(`${baseUrl}/`);
}

export async function logout(page: Page): Promise<void> {
  await page.click('button:text-is("Logout")');
  await page.waitForURL('**/login');
}



