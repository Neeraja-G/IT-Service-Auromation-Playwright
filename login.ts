import { chromium } from '@playwright/test';

console.log("Script started...");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://teams.microsoft.com');

  console.log('Login manually in browser...');

  await page.waitForTimeout(60000);

  await context.storageState({ path: 'auth.json' });

  console.log('Session saved!');

  await browser.close();
})();