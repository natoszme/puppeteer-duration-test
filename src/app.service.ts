import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import timer from 'src/utils/timer';

@Injectable()
export class AppService {
  private readonly time = timer(AppService.name);

  async getHello() {
    const html = `hello!`;

    const browser = await this._browser();

    var page = await browser.newPage();

    const options = {
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {
        top: "10px",
        bottom: "30px"
      },
      printBackground: true
    }
    
    await this.time("set content", () => page.setContent(html, {
      waitUntil: 'networkidle0'
    }));

    const pdf = await page.pdf(options);
    
    browser.close();
    
    return pdf;
  }

  _browser() {
    return puppeteer.launch({
      args: ['--no-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
      headless: true,
    });
  }
}
