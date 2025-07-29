import { Page, expect, Locator } from '@playwright/test';
import { button, closeAlert, verifyAndCloseAlert, inputField } from 'utils/baseUtils';
import { constants } from 'globalConfig/constants';
import { byButtonTextIs, byInputValue } from 'utils/locatorUtils';

export const createTodo = async (page: Page, todoText: string) => {
    const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);

    await expect(inputFieldLocator).toBeVisible();
    await inputFieldLocator.fill(todoText);
    await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
    await closeAlert(page);

    // verify todo item is created
    await expect(page.locator(`div span:text-is('${todoText}')`)).toBeVisible();
};

export const createMultipleToDo = async (page: Page, todos: string[]) => {
  for (const todoText of todos) {
    await createTodo(page, todoText);
  }
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


export const updateTodoAndAssert = async (page: Page, newToDoItem: string, updateToDoItem: string) => {
    const editButtonLocator = byButtonTextIs(page, constants.button_texts.edit);
    const saveButtonLocator: Locator = byButtonTextIs(page, constants.button_texts.save);

    await editButtonLocator.click();
    await expect(byInputValue(page, newToDoItem)).toBeVisible();
    await inputField.fill(byInputValue(page, newToDoItem), updateToDoItem);
    await expect(saveButtonLocator).toBeVisible();
    await saveButtonLocator.click();
    await verifyAndCloseAlert(page, `Todo updated to "${updateToDoItem}"`);
    await expect(page.locator(`span:text-is("${updateToDoItem}")`)).toBeVisible();
    await expect(page.locator(`span:text-is("${newToDoItem}")`)).not.toBeVisible();
};

export const updateAllTodosAndAssert = async (page: Page, updatedPrefix: string) => {
    const editButtons = page.getByRole('button', { name: constants.button_texts.edit });
    const count = await editButtons.count();

    for (let i = 0; i < count; i++) {
        const todoItemContainer: Locator = page.locator(`div:has(button:text-is('${constants.button_texts.edit}'))`).nth(i);
        const span: Locator = todoItemContainer.locator('span').first();
        const oldValue: string = (await span.textContent())?.trim() ?? "";
        const newValue: string = `${updatedPrefix}_${i}`;
        const editButton: Locator = todoItemContainer.getByRole('button', { name: constants.button_texts.edit }).first();
        const updateFieldLocator: Locator = page.locator(`input[value="${oldValue}"]`);
        const saveButton = byButtonTextIs(page, constants.button_texts.save);


        await expect(editButton).toBeVisible();
        await editButton.click();
        await expect(updateFieldLocator).toBeVisible();
        await updateFieldLocator.fill(newValue);
        await expect(saveButton).toBeVisible();
        await saveButton.click();
        await verifyAndCloseAlert(page, `Todo updated to "${newValue}"`);

        // Verify updated and old values in DOM
        await expect(page.locator(`span:text-is("${newValue}")`)).toBeVisible();
        await expect(page.locator(`span:text-is("${oldValue}")`)).not.toBeVisible();
    }
};
