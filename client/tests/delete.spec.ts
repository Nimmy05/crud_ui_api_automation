import 'tsconfig-paths/register';
import { test, expect } from '@playwright/test';
import { baseURL, constants } from '../globalConfig/constants';
import { createTodo, deleteAllTodos, deleteTodo, createMultipleToDo } from '../utils/todoActions';
import thisTestConfig from '../configs/create.config';

test.describe(`Automate the 'Delete' functionality of  'MERN Todo App'`, () => {

    test(`@Authenticated Should delete the ToDo Item`, async ({ page }) => {
        const newToDoItem: string = thisTestConfig.new_todo;

        await test.step(`Redirect to the Home`, async () => {
            await page.goto(`${baseURL}/`);
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step(`Verify the heading '${constants.headings.todo_list}' is visible`, async () => {
            await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
        });

        await test.step(`Clean up - delete all todos`, async () => {
            await deleteAllTodos(page);
        });

        await test.step(`Verify 'deleting' the single todo item`, async () => {
            await createTodo(page, newToDoItem);
            await deleteTodo(page, newToDoItem);
        });

        await test.step(`Verify 'deleting' more than one todo items`, async () => {
            await createMultipleToDo(page, [thisTestConfig.second_todo, newToDoItem]);
        });

        await test.step(`Delete all the todo items from the list`, async () => {
            await deleteAllTodos(page);
        });


    });
});
