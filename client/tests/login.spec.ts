import { test, expect, Locator } from '@playwright/test';
import { byButtonTextIs, byInputName, byText } from '../Utils/locatorUtils';
import { inputField, button } from '../Utils/baseUtils';

test.describe(`Automate the 'MERN Todo App' login page functionalities`, () => {
  test('Verify the login page by valid and invalid credentials', async ({ page }) => {
    const emailFieldLocator: Locator = byInputName(page, 'email');
    const passwordFieldLocator: Locator = byInputName(page, 'password');
    const loginButtonLocator: Locator = byButtonTextIs(page, 'Login');

    await test.step(`Redirect to the 'Login' page`, async () => {
      await page.goto('http://localhost:3000/login');
    });

    await test.step(`Verify the 'E-mail' field is visible`, async () => {
      await expect(emailFieldLocator).toBeVisible();
    });

    await test.step(`Fill the 'E-mail'`, async () => {
      await inputField.fill(emailFieldLocator, 'test67@gmail.com');
    });


    await test.step(`Verify the 'Password' field is visible`, async () => {
      await expect(passwordFieldLocator).toBeVisible();
    });

    await test.step(`Enter the 'Password'`, async () => {
      await inputField.fill(passwordFieldLocator, 'abc123');
    });

    await test.step(`Verify the 'Login' button is visible`, async () => {
      await expect(loginButtonLocator).toBeVisible();
    });

    await test.step(`Click on the 'Login' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the 'email' is logged in!`, async() => {
     await expect(page.locator('text=test67@gmail.com is Logged In')).toBeVisible();
    });

    await test.step(`Verify redirected to the 'Todo' page`, async() => {
     await expect(page.getByRole('heading', { level: 2 })).toHaveText('Todo List');
    });

  });

});


