import 'tsconfig-paths/register';
import { constants, timeout } from 'globalConfig/constants';
import { chromium, Locator, expect } from '@playwright/test';
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


  // const alert: Locator = page.getByRole('alert').first(); // or better CSS/XPath/text locator
  // await expect(alert).toBeVisible({timeout});

  // Optionally capture alert text before it disappears
//   const alerts = page.getByRole('alert');
// const loginAlert = alerts.filter({ hasText: `${email} is Logged In` }).first();
// await expect(loginAlert).toBeVisible({ timeout });
// expect(loginAlert).toBeGreaterThan(2);


  // Wait explicitly for alert/snackbar/toast with reduced timeout
  // const alert = page.locator('role=alert').first(); // or better CSS/XPath/text locator
  // await expect(alert).toBeVisible();

  // // Optionally capture alert text before it disappears
  // const alertText = await alert.innerText();
  // console.log('Login Alert:', alertText);
  // console.log('Login Alert:', `${email} is Logged In`);

  // Continue with other assertions
  // await expect(page.getByText(`${email} is Logged In`)).toBeVisible();
  
  await page.waitForURL(`${baseUrl}/`)
  // await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);

  // try {
  //   // Wait for input placeholder to ensure page is loaded after login
  //   await page.waitForSelector(`input[placeholder='${constants.place_holder_texts.new_to_do}']`, { timeout: 80000 });

  //   // Optionally wait for heading to confirm full load
  //   await page.waitForSelector('text=Todo List', { timeout: 80000 });
  // } catch (e) {
  //   await page.screenshot({ path: 'login-failed.png' });
  //   console.error('Login failed, page content:', await page.content());
  //   throw e;
  // }

  // Save authenticated storage state to file for test reuse
  await page.context().storageState({ path: './storage/storageState.json' });

  await browser.close();
}

export default globalSetup;
