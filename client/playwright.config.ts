require('tsconfig-paths/register');
import { defineConfig } from '@playwright/test';

import { config } from 'dotenv';

config();

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  timeout: 30 * 1000,
  webServer: {
    command: 'npm run dev',  // or whatever starts your frontend
    port: 3000,
    timeout: 120 * 1000,     // wait up to 2 minutes
    reuseExistingServer: !process.env.CI,  // skip starting if already running locally
  },
  use: {
    baseURL: process.env.REACT_BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Authenticated Tests',
      grep: /@Authenticated/,
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
