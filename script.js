const puppeteer = require('puppeteer');
const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require('./config');

// replaceText(document.body);
// Add comment
/*
function replaceText(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceText);
  } else if (element.nodeType === Text.TEXT_NODE) {
    console.log('Content : ', element.textContent);
    if (element.textContent.match(/coronavirus/gi)) {
      const newElement = document.createElement('span');
    }
  }
} */

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/', { timeout: 0 });
  await page.waitForSelector('input[name="email"]');

  await page.type('input[name="email"]', FACEBOOK_EMAIL);
  await page.type('input[name="pass"]', FACEBOOK_PASSWORD);
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  await page.evaluate(() => document.querySelector('*').outerHTML);

  const locationUrl = await page.evaluate(() => {
    return location.href;
  });

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log('Dimensions:', dimensions);
  console.log('Location Url:', locationUrl);

  await browser.close();
})();
