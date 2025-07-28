import { test, Locator, expect } from '@playwright/test';
import {  baseURL, constants } from 'globalConfig/constants';
import { inputField, button, closeAlert } from 'utils/baseUtils';
import { byButtonTextIs } from 'utils/locatorUtils'
import thisTestConfig from '@configs/create.config.spec';


test.describe(`Automate the 'Create ToDo' of 'MERN Todo App'`, () => {
    test(`Should create ToDo Item`, async ({ page }) => {
        const newToDoInputFieldLocator: Locator = page.locator(`input[placeholder='${constants.place_holder_texts.new_to_do}']`);
        const newToDo: string = thisTestConfig.new_todo;

        await test.step(`Navigate to the '${constants.headings.todo_list}'`, async () => {
            await page.goto(`${baseURL}/`);
        });
        
         await test.step(`Verify the heading '${constants.headings.todo_list}' is visible`, async () => {
            await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
        });
    
        await test.step(`Verify the '${constants.place_holder_texts.new_to_do}' input field is visible`, async () => {
            await expect(newToDoInputFieldLocator).toBeVisible();
        });

        await test.step(`Fill value in the '${constants.place_holder_texts.new_to_do}' input field`, async () => {
            await inputField.fill(newToDoInputFieldLocator, newToDo);
        });

        await test.step(`Click on the '${constants.button_texts.add}' button`, async () => {
            await button.clickOnButton(byButtonTextIs(page, constants.button_texts.add));
        });

        await test.step(`Verify the alert 'Todo for "${newToDo}" created successfully' is visible`, async () => {
            await expect(page.getByText(`Todo for "${newToDo}" created successfully`)).toBeVisible();
            await closeAlert(page);
        });

        await test.step(`Verify the todo item '${newToDo}' is created`, async () => {
            await expect(page.locator(`div span:text-is('${newToDo}')`)).toBeVisible();
        });

    });
});
