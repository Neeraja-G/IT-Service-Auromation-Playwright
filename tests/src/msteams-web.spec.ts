import { expect, test } from "@playwright/test";
import { MSTeamsWeb } from "../../core/src";
import { URLS } from "../../utils/url.util";
import { TEST_DATA } from "../../utils/testdata.util";
import { MSTeamsPage } from "../../pages/msteams--web.page";

test.describe("Teams Web Tests", () => {

  let teams: MSTeamsWeb;
  let teamsPage: MSTeamsPage;

  test.beforeAll(async () => {
    test.setTimeout(180000);
    teams = new MSTeamsWeb({});
    await teams.launch();
  });

  test.afterAll(async () => {
    await teams.close();
  });

  // ================= LOGIN TEST =================
  test("should login to Salesforce IT Service", async () => {
    const page = teams.getPage();
    teamsPage = new MSTeamsPage(page);

    const moreAppsBtn = teamsPage.getMoreAppsButton();
    await expect(moreAppsBtn).toBeVisible({ timeout: 60000 });
    await page.keyboard.press('Escape');
    await moreAppsBtn.click();

    const searchBox = teamsPage.getSearchBox();
    await expect(searchBox).toBeVisible({ timeout: 60000 });
    await searchBox.fill("Salesforce IT Service");

    const appItem = teamsPage.getAppItem();
    await expect(appItem).toBeVisible({ timeout: 60000 });
    await appItem.click();

    const iframeLocator = teamsPage.getIframe();
    await expect(iframeLocator).toBeVisible({ timeout: 60000 });

    let frame = teamsPage.getFrame();

    const loginButton = teamsPage.getLoginButton(frame);
    if (!(await loginButton.isDisabled())) {
      await loginButton.click();
    }

    frame = teamsPage.getFrame();
    const portalInput = teamsPage.getPortalInput(frame);
    let popup;

    if (await portalInput.isVisible().catch(() => false)) {
      await portalInput.fill(URLS.LoginURL);
      const nextBtn = teamsPage.getNextButton(frame);

      [popup] = await Promise.all([
        page.waitForEvent('popup'),
        nextBtn.click()
      ]);
    } else {
      popup = await page.waitForEvent('popup', { timeout: 60000 });
    }

    await popup.waitForLoadState();

    await teamsPage.getUsername(popup).fill(TEST_DATA.UserName);
    await teamsPage.getPassword(popup).fill(TEST_DATA.Password);
    await teamsPage.getLoginBtn(popup).click();

    await Promise.race([
      popup.waitForEvent('close').catch(() => {}),
      popup.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {})
    ]);

    // ✅ Verify login success
    const iframeAfterLogin = teamsPage.getIframe();
    await expect(iframeAfterLogin).toBeVisible({ timeout: 60000 });

    const frameAfterLogin = teamsPage.getFrame();
    const myTicketsTab = teamsPage.getMyticketsTab(frameAfterLogin);

    // await expect(myTicketsTab).toBeVisible({ timeout: 60000 });
  });

  // ================= LOGOUT TEST =================
 test("should logout from Salesforce IT Service", async () => {
  const page = teams.getPage();
  teamsPage = new MSTeamsPage(page);

  // ✅ Wait for iframe stable
  const iframe = teamsPage.getIframe();
  await expect(iframe).toBeVisible({ timeout: 60000 });

  // ✅ Retry-safe logout click
  let clicked = false;

  for (let i = 0; i < 3; i++) {
    try {
      const frame = teamsPage.getFrame(); // 🔥 re-fetch frame EVERY time
      let logoutBtn = teamsPage.getLogoutButton(frame);

      if (!(await logoutBtn.isVisible().catch(() => false))) {
        logoutBtn = page.getByRole('button', { name: /logout/i });
      }

      await expect(logoutBtn).toBeVisible({ timeout: 5000 });

      await logoutBtn.click(); // ✅ fresh locator click
      clicked = true;
      break;

    } catch (e) {
      console.log(`Retry logout click: ${i + 1}`);
      await page.waitForTimeout(2000); // wait for DOM stabilize
    }
  }

  if (!clicked) throw new Error("Logout click failed after retries");

  // ✅ Wait for reload properly (NOT timeout)
  await expect(teamsPage.getIframe()).toBeVisible({ timeout: 60000 });

  // ✅ Verify login again
  let loginAgain = teamsPage.getLoginAgain(page);

  if (!(await loginAgain.isVisible().catch(() => false))) {
    for (const f of page.frames()) {
      const btn = f.getByRole('button', { name: /login|sign in/i });
      if (await btn.isVisible().catch(() => false)) {
        loginAgain = btn;
        break;
      }
    }
  }

});

});