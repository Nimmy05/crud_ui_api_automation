import 'tsconfig-paths/register';
import { test, expect } from '@playwright/test';
import { baseURL, constants } from '../globalConfig/constants';
import { createTodo, deleteAllTodos } from '../utils/todoActions';
import { button, verifyAndCloseAlert } from '../utils/baseUtils';
import thisTestConfig from '../configs/create.config';
import { byButtonTextIs } from '../utils/locatorUtils';

test.describe(`Automate the 'Create ToDo' of 'MERN Todo App'`, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${baseURL}/`);
    });

    test(`Should create ToDo Item`, async ({ page }) => {
        const newToDoItem = thisTestConfig.new_todo;
        const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);

        await test.step(`Verify the heading '${constants.headings.todo_list}' is visible`, async () => {
            await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
        });

        await test.step(`Clean up - delete all todos`, async () => {
            await deleteAllTodos(page);
        });

        await test.step(`Create a new todo item '${newToDoItem}' and verify it is added`, async () => {
            await createTodo(page, newToDoItem);
        });

        await test.step(`Try creating duplicate todo item`, async () => {
            await inputFieldLocator.fill(newToDoItem);
            await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
        });

        await test.step(`Verify duplicate todo alert`, async () => {
            await verifyAndCloseAlert(page, constants.alert_texts.duplicate_to_do);
        });

        await test.step(`Try creating blank todo item`, async () => {
            await inputFieldLocator.fill('');
            await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
        });

        await test.step(`Verify blank todo alert`, async () => {
            await verifyAndCloseAlert(page, constants.alert_texts.blank_todo);
        });

        await test.step(`Create another valid todo item`, async () => {
            await createTodo(page, thisTestConfig.second_todo);
        });

        await test.step(`Clean up - delete all todos`, async () => {
            await deleteAllTodos(page);
        });
    });
});
