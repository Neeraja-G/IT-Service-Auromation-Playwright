import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: '.',
  timeout: 120 * 1000,
  expect: {
    timeout: 120 * 1000,
  },
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
};

export default config;