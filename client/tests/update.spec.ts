import { test, expect } from '@playwright/test';
import { baseURL, constants } from 'globalConfig/constants';
import { createTodo, deleteAllTodos, updateAllTodosAndAssert, updateTodoAndAssert } from 'utils/todoActions';
import thisTestConfig from '@configs/update.config';

test.describe(`Automate the 'Update ToDo' of 'MERN Todo App'`, () => {
    test(`Should 'Update' the ToDo Item`, async ({ page }) => {
        const newToDoItem: string = thisTestConfig.new_todo;
        const updateToDoItem: string = thisTestConfig.update_todo;

        // await test.step(`Navigate to the '${constants.headings.todo_list}'`, async () => {
        //     await page.goto(`${baseURL}/`);
        // });

        await test.step(`Verify the heading '${constants.headings.todo_list}' is visible`, async () => {
            await expect(page.getByRole('heading', { level: 2 })).toHaveText(constants.headings.todo_list);
        });

        // perform clean up
        await test.step(`Delete the todo items from the list`, async () => {
            await deleteAllTodos(page);
        });

        await test.step(`Create a new todo item '${newToDoItem}', Update the todo item '${newToDoItem}' to '${updateToDoItem}' and Verify it has been updated`, async () => {
            await createTodo(page, newToDoItem);
            await updateTodoAndAssert(page, newToDoItem, updateToDoItem);
        });

        await test.step(`Verify can be update the existing todo item '${updateToDoItem}'`, async () => {
            await updateTodoAndAssert(page, updateToDoItem, thisTestConfig.update_existing);
        });

        await test.step(`Verify can be update more than one todo items`, async () => {
            await createTodo(page, thisTestConfig.update_todo_prefix);
            await updateAllTodosAndAssert(page, thisTestConfig.update_todo_prefix);
        });

        // perform clean up
        await test.step(`Delete the todo items from the list`, async () => {
            await deleteAllTodos(page);
        });

    });
});
