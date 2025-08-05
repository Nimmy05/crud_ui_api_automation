import { chromium, Locator } from '@playwright/test';
import { config } from 'dotenv';

config();

async function globalTeardown() {
    const browser = await chromium.launch();
    const context = await browser.newContext({ storageState: './storage/storageState.json' });
    const page = await context.newPage();

    const baseUrl = process.env.REACT_BASE_URL!;
    await page.goto(`${baseUrl}/`);
    await page.waitForLoadState('domcontentloaded');

    const logoutButton: Locator = page.locator(`button:text-is('Logout')`);
    await logoutButton.waitFor({ state: 'visible', timeout: 500 });
    await logoutButton.click();
    await page.waitForLoadState('domcontentloaded');

    await page.waitForURL(`${baseUrl}/login`, { timeout: 5000 * 2 });
    await page.waitForLoadState('domcontentloaded');

    console.log('Logout completed successfully.');

    await browser.close();

}

export default globalTeardown;
