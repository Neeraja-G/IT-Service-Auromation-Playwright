const { chromium } = require('@playwright/test');

(async () => {
  const userDataDir = './user-data'; // 👈 folder to store session

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome'
  });

  const page = await context.newPage();

  await page.goto('https://teams.microsoft.com');

  console.log("Login once. This will be saved permanently.");

})();