import 'tsconfig-paths/register';
import { test } from '@playwright/test';
import { baseURL } from '../globalConfig/constants';
import { createTodo, deleteAllTodos, updateAllTodosAndAssert, updateTodoAndAssert } from '../utils/todoActions';
import thisTestConfig from '../configs/update.config';

test.describe(`Automate the 'Update ToDo' of 'MERN Todo App'`, () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${baseURL}/`);
    });

    test(`Should 'Update' the ToDo Item`, async ({ page }) => {
        const { new_todo, update_todo, update_existing, update_todo_prefix } = thisTestConfig;

        await test.step(`Clean up - delete all todos`, async () => {
            await deleteAllTodos(page);
        });

        await test.step(`Create '${new_todo}', update to '${update_todo}', and assert`, async () => {
            await createTodo(page, new_todo);
            await updateTodoAndAssert(page, new_todo, update_todo);
        });

        await test.step(`Update existing todo '${update_todo}' to '${update_existing}'`, async () => {
            await updateTodoAndAssert(page, update_todo, update_existing);
        });

        await test.step(`Create another item and perform bulk update`, async () => {
            await createTodo(page, update_todo_prefix);
            await updateAllTodosAndAssert(page, update_todo_prefix);
        });

        await test.step(`Clean up - delete all todos`, async () => {
            await deleteAllTodos(page);
        });
    });
});
