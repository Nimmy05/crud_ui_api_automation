import { Page, expect } from '@playwright/test';
import { button, closeAlert } from 'utils/baseUtils';
import { constants } from 'globalConfig/constants';
import { byButtonTextIs } from 'utils/locatorUtils';

export const createTodo = async (page: Page, todoText: string) => {
    const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);

    await expect(inputFieldLocator).toBeVisible();
    await inputFieldLocator.fill(todoText);
    await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
    await closeAlert(page);

    // verify todo item is created
    await expect(page.locator(`div span:text-is('${todoText}')`)).toBeVisible();
};

export const deleteTodo = async (page: Page, todoText: string) => {
    const deleteButtonLocator = byButtonTextIs(page, constants.button_texts.delete);

    await expect(deleteButtonLocator).toBeVisible();
    await deleteButtonLocator.click();
    await expect(page.getByText(`Todo "${todoText}" has been deleted`)).toBeVisible();
    await closeAlert(page);

    // verify todo item is deleted
    await expect(page.locator(`div span:text-is('${todoText}')`)).not.toBeVisible();
};

export const deleteAllTodos = async (page: Page) => {
  let deleteButtons = page.getByRole('button', { name: constants.button_texts.delete });

  while (await deleteButtons.count() > 0) {
    const button = deleteButtons.first();
    const todoText = await button.locator('..').locator('span').innerText();

    await expect(button).toBeVisible();
    await button.click();
    await expect(page.getByText(`Todo "${todoText}" has been deleted`)).toBeVisible();
    await closeAlert(page);

    await expect(page.locator(`span:text-is("${todoText}")`)).not.toBeVisible();

    deleteButtons = page.getByRole('button', { name: constants.button_texts.delete });
  }

  await expect(page.getByText(constants.alert_texts.no_todos)).toBeVisible();
};

