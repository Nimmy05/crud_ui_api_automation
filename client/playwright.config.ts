import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    baseURL: process.env.REACT_BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Authenticated Tests',
      grepInvert: /@noLogin/,
      use: {
        storageState: './storage/storageState.json',
      },
    },
    {
      name: 'Login Tests',
      grep: /@noLogin/,
      use: {
        storageState: undefined,
      },
    },
  ],
  reporter: [
    ['list'], // optional: console output in list format
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // generate HTML report
  ],
});
