import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://login.microsoftonline.com/common/login');
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.goto('https://teams.cloud.microsoft/');
  await page.getByRole('button', { name: 'View more apps' }).click();
  await page.getByRole('listitem', { name: 'Salesforce IT Service' }).click();
  await page.locator('iframe[name="embedded-page-container"]').contentFrame().getByTestId('welcome-page-login-button').click();
  await page.locator('iframe[name="embedded-page-container"]').contentFrame().getByTestId('portal-input').fill('https://orgfarm-f0935731d7.demo.test1.my.pc-rnd.site.com/employee');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe[name="embedded-page-container"]').contentFrame().getByTestId('portal-popup-action-button').click();
  const page1 = await page1Promise;
  await page1.goto('https://orgfarm-f0935731d7.demo.test1.my.pc-rnd.site.com/employee/s/login/?startURL=%2Femployee%2Fsetup%2Fsecur%2FRemoteAccessAuthorizationPage.apexp%3Fsource%3DCAAAAZ1M_OFpMDAwMDAwMDAwMDAwMDAwAAABBk-2LAXKjvlTCmBbBlo_taDiqNpxHrqZFRPGrNF4xvVkiVNB7M1vjnQTtN_Ywd4WMTVe9K0C7fWoLAR8EiTgWEPBJlsfLute7GqNPh9ALv649ct3qIne3dVPjygm3DE6v_EwKu9-PntOw4GrvkJGBQQg9ppwB2A3HRb18CJwrpzvU2P-yZDGRQcURsPuXzxUJ33IdbEtH9ZeOB78GzNdVqUzPZUanhDGQ_Dg07guFYiRxP3fOtWaVHMMOu42_7LbDqM4gAt2kr5qjw--Tbtevo6Vr85rSYCz3PtOHcZ9Y9NwH162MF9-dCrOlNk-EenaehMF5p1wfM7d5uzzhGJwHnIodY9ONyiYwToEB6sfRb2hrGVBsZ7hqcaSEAJvTbWJm6g5V2ags9G1GAkY9lfzTKdRtNNl4GJ3FOUboQeiQKhLpzKt92y2w-pQeLBDGQ2j3-Pc-aar0LHbp2Pu1W25aaEMJG9dHXdOOVmJl-HzwbQ-mA0lfsWCs-7N8pR_YIQr6lC-jPw6sX8e4yMh4w3juiMinmsYPWVIRlYTipLOJwKYCHC4JrtGBQTAmIdvaY3v2JEP76EXN1b6P31h9G0sL561UFcIpZBDyOqLHQzp99i0kn_TlbhkLqyr3tNXYpgtBjArWxKAPDHA6klzA-sAC63DBbiCcgKtafCzDrifYB1M9Tqvn1WERKyzSOKJ1RaZX4P7WMQy2QNswMNRDnREp4RG35U76ZQcOnWh_6JpNT__NbgmyrNp3XU7tGUMDFdBe_Cx6eecBevuF5kIiY3b1b2vX53wUInc8eG7ZZ-IPl7y5Dmd_4IbFrelJCtLNVtD8Vrgyuv4vS3dh0rzy81Ifb9y1OGMQ3BANxnKgDgjl3Uu&sdtd=1&dch=0nQPPftHV8.sLRhdnXXYMTsi3K_PDnvVW4eOyOdwpagANPkIT1KDodcokckz1pNBwtmE4epxM8Rx4c4fO.2sHdPicKCs00UQNTxs83DiLjoBBCY74hc%3D');
  await page1.getByRole('textbox', { name: 'Username' }).click();
  await page1.getByRole('textbox', { name: 'Username' }).fill('jack_ccpmanager@sf.com');
  await page1.getByRole('textbox', { name: 'Password' }).click();
  await page1.getByRole('textbox', { name: 'Password' }).fill('orgfarm1234');
  await page1.getByRole('button', { name: 'Log in' }).click();
  await page1.goto('https://green-sand-06806181e.2.azurestaticapps.net/auth/callback?code=aPrxwPMUfJWmPCzJmztrQNmbcB33FrdA6_fPg2nRqjYXizaBbHmk0wNrNh2euUr.dpER3rd0FDHSLF346Tyjnq3bgvrgsv8%3D&sfdc_community_url=https%3A%2F%2Forgfarm-f0935731d7.demo.test1.my.pc-rnd.site.com%2Femployee&sfdc_community_id=0DBSB000001iB7F4AU#/tab');
  await page.getByRole('tab', { name: 'Service Catalog' }).click();
  await page.getByRole('tab', { name: 'Approvals' }).click();
  await page.getByRole('tab', { name: 'Ask AI Agent' }).click();
  await page.getByRole('tab', { name: 'Employee Enablement' }).click();
});