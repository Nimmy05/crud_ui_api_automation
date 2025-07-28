import { test, expect, Locator } from '@playwright/test';
import { byAriaLabel, byButtonTextIs, byInputName } from '../Utils/locatorUtils';
import { constants } from '../globalConfig/constants.ts';
import { inputField, button, resetFormFields } from '../Utils/baseUtils';
import thisTestConfig from '../configs/login.config.ts';
import { LoginUser } from '../src/data/interfaces.ts';

test.describe(`Automate the 'MERN Todo App' login page functionalities`, () => {
  test('Verify login with various credential combinations', async ({ page }) => {
    const emailField: Locator = byInputName(page, 'email');
    const passwordField: Locator = byInputName(page, 'password');
    const loginButton: Locator = byButtonTextIs(page, constants.button_texts.login);
    const user: LoginUser = thisTestConfig.login_user;
    const closeAlert = () => button.clickOnButton(byAriaLabel(page, 'button', 'close').first());

    await test.step('Navigate to login page', async () => {
      await page.goto('http://localhost:3000/login');
    });

    // Case 1: Missing Password
    await test.step('Attempt login with only email', async () => {
      await inputField.fill(emailField, user.email);
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.password_required)).toBeVisible();
      await closeAlert();
      await resetFormFields({ email: emailField });
    });

    // Case 2: Missing Email
    await test.step('Attempt login with only password', async () => {
      await inputField.fill(passwordField, user.password);
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.email_required)).toBeVisible();
      await closeAlert();
      await resetFormFields({ password: passwordField });
    });

    // Case 3: Invalid email format
    await test.step('Attempt login with invalid email format', async () => {
      await inputField.fill(emailField, thisTestConfig.invalid_email_format);
      await inputField.fill(passwordField, user.password);
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.require_valid_email)).toBeVisible();
      await closeAlert();
      await resetFormFields({ email: emailField, password: passwordField });
    });

    // Case 4: Both fields empty
    await test.step('Attempt login with empty credentials', async () => {
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.required_both)).toBeVisible();
      await closeAlert();
    });

    // Case 5: Wrong credentials
    await test.step('Attempt login with incorrect credentials', async () => {
      await inputField.fill(emailField, thisTestConfig.wrong_email);
      await inputField.fill(passwordField, thisTestConfig.wrong_password);
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.not_exist)).toBeVisible();
      await closeAlert();
    });

    // Case 6: Valid email with wrong password
    await test.step('Attempt login with valid email and wrong password', async () => {
      await resetFormFields({ email: emailField, password: passwordField });
      await inputField.fill(emailField, user.email);
      await inputField.fill(passwordField, thisTestConfig.wrong_password);
      await loginButton.click();
      await expect(page.getByText(constants.alert_texts.incorrect_password)).toBeVisible();
      await closeAlert();
    });

    // Case 7: Valid login
    await test.step('Login with valid credentials', async () => {
      await resetFormFields({ email: emailField, password: passwordField });
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await inputField.fill(emailField, user.email);
      await inputField.fill(passwordField, user.password);
      await expect(loginButton).toBeVisible();
      await loginButton.click();
    });

    await test.step('Verify login success and redirection', async () => {
      await expect(page.getByText(`${user.email} is Logged In`)).toBeVisible();
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
    });
  });
});
