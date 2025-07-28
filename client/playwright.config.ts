// playwright.config.ts
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: './global-setup',
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Authenticated Tests',
      // All tests EXCEPT those with @noLogin
      grepInvert: /@noLogin/,
      use: {
        storageState: './storage/storageState.json',
      },
    },
    {
      name: 'Login Tests',
      // Only tests with @noLogin
      grep: /@noLogin/,
      use: {
        storageState: undefined,
      },
    },
  ],
});
