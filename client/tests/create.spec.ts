import { test } from '@playwright/test';
import { timeout, baseURL } from 'globalConfig/constants';


test.describe(`Automate the 'Create ToDo' of 'MERN Todo App'`, () => {
    test(`Verify can be created the 'Todo'`, async ({ page }) => {

        await page.goto(`${baseURL}/`);

        await page.waitForSelector(`input[placeholder="Enter new todo"]`, { timeout: timeout });

        await page.fill(`input[placeholder="Enter new todo"]`, 'Test');

        // await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);

    });
});
