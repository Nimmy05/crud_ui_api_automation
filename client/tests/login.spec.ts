import { test, expect, Locator } from '@playwright/test';
import { byAriaLabel, byButtonTextIs, byInputName } from '../Utils/locatorUtils';
import { constants } from '../globalConfig/constants.ts';
import { inputField, button, resetFormFields } from '../Utils/baseUtils';
import thisTestConfig from '../configs/login.config.spec.ts';
import { LoginUser } from '../src/data/interfaces.ts'

test.describe(`Automate the 'MERN Todo App' login page functionalities`, () => {
  test('Verify the login page by valid and invalid credentials', async ({ page }) => {
    const emailFieldLocator: Locator = byInputName(page, 'email');
    const passwordFieldLocator: Locator = byInputName(page, 'password');
    const loginButtonLocator: Locator = byButtonTextIs(page, constants.button_texts.login);
    const loginUser: LoginUser = thisTestConfig.login_user;

    await test.step(`Redirect to the '${constants.button_texts.login}' page`, async () => {
      await page.goto('http://localhost:3000/login');
    });

    await test.step(`Enter 'Email'`, async () => {
      await inputField.fill(emailFieldLocator, loginUser.email);
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.password_required}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.password_required)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.password_required}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Reset 'Email' field`, async () => {
      await resetFormFields({ email: emailFieldLocator });
    });

    await test.step(`Enter 'Password'`, async () => {
      await inputField.fill(passwordFieldLocator, loginUser.password);
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.email_required}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.email_required)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.email_required}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Reset the 'Password' field`, async () => {
      await resetFormFields({ password: passwordFieldLocator });
    });

    await test.step(`Enter 'Invalid Email format'`, async () => {
      await inputField.fill(emailFieldLocator, thisTestConfig.invalid_email_format);
    });

    await test.step(`Enter 'Password'`, async () => {
      await inputField.fill(passwordFieldLocator, loginUser.password);
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.require_valid_email}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.require_valid_email)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.require_valid_email}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Reset both 'Email' and 'Password' fields`, async () => {
      await resetFormFields({
        email: emailFieldLocator,
        password: passwordFieldLocator
      });
    });


    await test.step(`Reset the 'Email' and 'Password' fields`, async () => {
      await resetFormFields({ email: emailFieldLocator, password: passwordFieldLocator });
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.required_both}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.required_both)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.required_both}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Enter 'Wrong Email'`, async () => {
      await inputField.fill(emailFieldLocator, thisTestConfig.wrong_email);
    });

    await test.step(`Enter 'Wrong Password'`, async () => {
      await inputField.fill(passwordFieldLocator, thisTestConfig.wrong_password);
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.not_exist}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.not_exist)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.not_exist}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Reset both 'Email and Password' field`, async () => {
      await resetFormFields({ email: emailFieldLocator, password: passwordFieldLocator });
    });

    await test.step(`Enter the user 'Email'`, async () => {
      await inputField.fill(emailFieldLocator, thisTestConfig.login_user.email);
    });

    await test.step(`Enter 'Wrong Password'`, async () => {
      await inputField.fill(passwordFieldLocator, thisTestConfig.wrong_password);
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the validation error message '${constants.alert_texts.incorrect_password}' is displayed`, async () => {
      await expect(page.getByText(constants.alert_texts.incorrect_password)).toBeVisible();
    });

    await test.step(`Close the '${constants.alert_texts.incorrect_password}' alert`, async () => {
      await button.clickOnButton(byAriaLabel(page, 'button', 'close').first());
    });

    await test.step(`Reset both 'Email and Password' field`, async () => {
      await resetFormFields({ email: emailFieldLocator, password: passwordFieldLocator });
    });

    await test.step(`Verify the 'E-mail' field is visible`, async () => {
      await expect(emailFieldLocator).toBeVisible();
    });

    await test.step(`Verify the 'E-mail' field is visible`, async () => {
      await expect(emailFieldLocator).toBeVisible();
    });

    await test.step(`Fill the 'E-mail'`, async () => {
      await inputField.fill(emailFieldLocator, loginUser.email);
    });


    await test.step(`Verify the 'Password' field is visible`, async () => {
      await expect(passwordFieldLocator).toBeVisible();
    });

    await test.step(`Enter the 'Password'`, async () => {
      await inputField.fill(passwordFieldLocator, loginUser.password);
    });

    await test.step(`Verify the '${constants.button_texts.login}' button is visible`, async () => {
      await expect(loginButtonLocator).toBeVisible();
    });

    await test.step(`Click on the '${constants.button_texts.login}' button`, async () => {
      await loginButtonLocator.click();
    });

    await test.step(`Verify the 'email' is logged in!`, async () => {
      await expect(page.getByText(`${loginUser.email} is Logged In`)).toBeVisible();
    });

    await test.step(`Verify redirected to the 'Todo' page`, async () => {
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
    });

  });

});


