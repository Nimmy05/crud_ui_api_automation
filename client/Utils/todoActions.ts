import 'tsconfig-paths/register';
import { Page, Locator } from '@playwright/test';
import { button, closeAlert, verifyAndCloseAlert, inputField } from '../utils/baseUtils';
import { constants, timeout } from '../globalConfig/constants';
import { byButtonTextIs, byInputValue } from '../utils/locatorUtils';

export const createTodo = async (page: Page, todoText: string) => {
    const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);
    const addButton: Locator = byButtonTextIs(page, constants.button_texts.add);

    await inputFieldLocator.waitFor({ state: 'visible', timeout: timeout });
    await inputFieldLocator.fill(todoText);
    await page.waitForLoadState('domcontentloaded');
    await addButton.waitFor({ state: 'visible', timeout: timeout });
    await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
    await page.waitForLoadState('domcontentloaded');
    await closeAlert(page);

    // verify todo item is created
    const createToDo: Locator = page.locator(`div span:text-is('${todoText}')`);
    await createToDo.waitFor({ state: 'visible', timeout: timeout * 3 });

};

export const createMultipleToDo = async (page: Page, todos: string[]) => {
    for (const todoText of todos) {
        await createTodo(page, todoText);
    }
};


export const deleteTodo = async (page: Page, todoText: string) => {
    const deleteButtonLocator = byButtonTextIs(page, constants.button_texts.delete).first();

    await deleteButtonLocator.waitFor({ state: 'visible', timeout: timeout });
    await deleteButtonLocator.click();

    await page.waitForLoadState('networkidle');

    const deletetedItem: Locator = page.getByText(`Todo "${todoText}" has been deleted`);
    await deletetedItem.waitFor({ state: 'visible', timeout: timeout * 3 });

    await closeAlert(page);

    // Verify todo item is deleted
    const deleteItem: Locator = page.locator(`div span:text-is("${todoText}")`);
    await deleteItem.waitFor({ state: 'hidden', timeout: timeout });
};

export const deleteAllTodos = async (page: Page) => {
    let deleteButtons = page.getByRole('button', { name: constants.button_texts.delete });

    while (await deleteButtons.count() > 0) {
        const button = deleteButtons.first();
        const todoText = await button.locator('..').locator('span').innerText();

        await button.waitFor({ state: 'visible', timeout: timeout });
        await button.waitFor({ state: 'visible', timeout: timeout });
        await button.click();
        await page.waitForLoadState('domcontentloaded');

        const deleteText: Locator = page.getByText(`Todo "${todoText}" has been deleted`);
        await deleteText.waitFor({ state: 'visible', timeout: timeout });

        await closeAlert(page);
        await page.waitForLoadState('domcontentloaded');
        const removeItem: Locator = page.locator(`span:text-is("${todoText}")`);
        await removeItem.waitFor({ state: 'hidden', timeout: timeout });
    }
    const deleteItem: Locator = page.getByText(constants.alert_texts.no_todos);
    await deleteItem.waitFor({ state: 'visible', timeout: timeout });
};


export const updateTodoAndAssert = async (page: Page, newToDoItem: string, updateToDoItem: string) => {
    const editButtonLocator = byButtonTextIs(page, constants.button_texts.edit).first();
    const saveButtonLocator: Locator = byButtonTextIs(page, constants.button_texts.save);

    await editButtonLocator.waitFor({ state: 'visible', timeout: timeout });
    await editButtonLocator.click();
    await page.waitForLoadState('domcontentloaded');
    const prompt: Locator = byInputValue(page, newToDoItem);
    await prompt.waitFor({ state: 'visible', timeout: timeout * 2 });
    await inputField.fill(byInputValue(page, newToDoItem), updateToDoItem);
    await page.waitForLoadState('domcontentloaded');
    await saveButtonLocator.waitFor({ state: 'visible', timeout: timeout });
    await saveButtonLocator.click();
    await page.waitForLoadState('networkidle');
    await verifyAndCloseAlert(page, `Todo updated to "${updateToDoItem}"`);
    const updatedItem: Locator = page.locator(`span:text-is("${updateToDoItem}")`);
    await updatedItem.waitFor({ state: 'visible', timeout: timeout * 3 });
    const notToSeeUpdatedItem: Locator = page.locator(`span:text-is("${newToDoItem}")`);
    await notToSeeUpdatedItem.waitFor({ state: 'hidden', timeout: timeout * 3 });
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

        await editButton.waitFor({ state: 'visible', timeout: timeout });
        await editButton.click();
        await page.waitForLoadState('domcontentloaded');
        await updateFieldLocator.waitFor({ state: 'visible', timeout: timeout });
        await updateFieldLocator.fill(newValue);
        await page.waitForLoadState('domcontentloaded');
        await saveButton.waitFor({ state: 'visible', timeout: timeout });
        await saveButton.click();
        await page.waitForLoadState('networkidle');
        await verifyAndCloseAlert(page, `Todo updated to "${newValue}"`);

        const updatedItem: Locator = page.locator(`span:text-is("${newValue}")`);
        await updatedItem.waitFor({ state: 'visible', timeout: timeout });
        const removeItems: Locator = page.locator(`span:text-is("${oldValue}")`);
        await removeItems.waitFor({ state: 'hidden', timeout: timeout });
    
    }
};
