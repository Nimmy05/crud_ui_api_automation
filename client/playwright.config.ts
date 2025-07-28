import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('global-setup.ts'),

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    // Store the storage state in the root-level storage folder
    storageState: path.resolve(process.cwd(), 'storage/storageState.json'),
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
