// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: 'test',

  // Each test is given 30 seconds
  timeout: 30000,

  testMatch: '**/test/*.spec.ts',
};
export default config;