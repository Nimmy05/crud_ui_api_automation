import { test, expect } from '@playwright/test';
import { baseURL, constants } from 'globalConfig/constants';
import { createTodo, deleteAllTodos } from 'utils/todoActions';
import { button, verifyAndCloseAlert } from 'utils/baseUtils';
import thisTestConfig from '@configs/create.config';
import { byButtonTextIs } from 'utils/locatorUtils';

test.describe(`Automate the 'Create ToDo' of 'MERN Todo App'`, () => {
    test(`Should create ToDo Item`, async ({ page }) => {
        const newToDoItem: string = thisTestConfig.new_todo;
        const inputFieldLocator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);


        await test.step(`Navigate to the '${constants.headings.todo_list}'`, async () => {
            await page.goto(`${baseURL}/`);
        });

        await test.step(`Verify the heading '${constants.headings.todo_list}' is visible`, async () => {
            await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
        });

        await test.step(`Create a new todo item '${newToDoItem}' and verify it is added to the list`, async () => {
            await createTodo(page, newToDoItem);
        });

        await test.step(`Create duplicate todo item`, async () => {
            await inputFieldLocator.fill(newToDoItem);
            await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
        });

        await test.step(`Verify the '${constants.alert_texts.duplicate_to_do}' alert is visible`, async () => {
            await verifyAndCloseAlert(page, constants.alert_texts.duplicate_to_do);
        });

        await test.step(`Create blank todo item`, async () => {
            await inputFieldLocator.fill('');
            await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
        });

        await test.step(`Verify the '${constants.alert_texts.blank_todo}' alert is visible`, async () => {
            await verifyAndCloseAlert(page, constants.alert_texts.blank_todo);
        });

        await test.step(`Verify creating more than one todo items`, async () => {
            await createTodo(page, thisTestConfig.second_todo);
        });

        // perform clean up
        await test.step(`Delete the todo items from the list`, async () => {
            await deleteAllTodos(page);
        });

    });
});
