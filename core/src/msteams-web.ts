import { chromium, Page, BrowserContext } from 'playwright';
import { M365Credential } from './shared';

export class MSTeamsWeb {
  cred: M365Credential;

  bctx!: BrowserContext;
  bpage!: Page;

  constructor(cred: M365Credential) {
    this.cred = cred;
  }

  public async launch() {
    this.bctx = await chromium.launchPersistentContext('./user-data', {
      headless: false,
      channel: 'chrome',
      args: ['--start-maximized']
    });

    const pages = this.bctx.pages().filter((page) => !page.isClosed());
    this.bpage =
      pages.find((page) => page.url() !== 'about:blank') ??
      pages[0] ??
      (await this.bctx.newPage());

    if (this.bpage.isClosed()) {
      this.bpage =
        this.bctx.pages().find((page) => !page.isClosed()) ??
        (await this.bctx.newPage());
    }

    await this.bpage.goto('https://teams.microsoft.com/', {
      waitUntil: 'domcontentloaded'
    });

    await this.bpage.waitForURL(/teams\.(microsoft|cloud\.microsoft)\.com/, {
      timeout: 120000
    });

    await this.bpage.waitForSelector('[role="navigation"]', {
      timeout: 120000
    });

    await this.bpage.waitForLoadState('networkidle', {
      timeout: 120000
    }).catch(() => {});
  }

  public getPage(): Page {
    if (this.bpage && !this.bpage.isClosed()) {
      return this.bpage;
    }

    const activePage = this.bctx.pages().find((page) => !page.isClosed());
    if (activePage) {
      this.bpage = activePage;
      return activePage;
    }

    return this.bpage;
  }

  public getActivePage(): Page {
    const pages = this.bctx.pages().filter((page) => !page.isClosed());
    const preferred = pages.find(
      (page) =>
        page.url() !== 'about:blank' &&
        /teams\.microsoft\.com|office\.com|microsoft\.com|salesforce/i.test(
          page.url()
        )
    );
    return preferred ?? pages[0] ?? this.bpage;
  }

  public async close() {
    if (this.bctx) {
      await this.bctx.close();
    }
  }
}