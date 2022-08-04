const fs = require('fs');
const puppeteer = require('puppeteer');
const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require('./config');

// if screenshots directory is not exist then create one
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

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

/*
(async () =>{
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.goto('https://www.facebook.com/', { waitUntil: "networkidle2" });
  await page.waitForSelector('input[name="email"]', {
    timeout: 10000,
  });
  await page.type('input[name="email"]', FACEBOOK_EMAIL, { delay: 50 });
  await page.type('input[name="pass"]', FACEBOOK_PASSWORD, { delay: 50 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.waitForTimeout(1000 + Math.floor(Math.random() * 500));
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  let bodyString = bodyHTML.toString();
 console.log("Body : ", bodyString)
})(); */

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/', { timeout: 0 });
  await page.waitForSelector('input[name="email"]');

  await page.type('input[name="email"]', FACEBOOK_EMAIL);
  await page.type('input[name="pass"]', FACEBOOK_PASSWORD);
  await page.keyboard.press('Enter');

  console.log('1');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  // await page.evaluate(() => document.querySelector('*').outerHTML);

  /*
  const locationUrl = await page.evaluate(() => {
    return location.href;
  }); */

  console.log('2');

  // Get the "viewport" of the page, as reported by the page.
  /*
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  }); */

  await page.goto(
    'https://web.facebook.com/frendlyblog/posts/pfbid0rCRp7Qm7YGTj4Mjn4SyuPnZqRHfTATsfbpfEK14PtwwTpkhGDpcU772m4r6DiEgcl',
    { waitUntil: 'networkidle2', timeout: 0 }
  );
  console.log('3');
  await page.screenshot({ path: 'blogPage.png' });

  // await page.waitForNavigation({ waitUntil: 'networkidle2' });
  // await page.evaluate(() => document.querySelector('*').outerHTML);

  const divs = await page.$$eval('div[role="article"]', (divs) =>
    divs.map((div) => {
      return {
        text: div.textContent,
        html: div.innerHTML,
        ariaLabel: div.ariaLabel,
      };
    })
  );

  await page.click('span[aria-label="Voir qui a réagi"]');

  /*  
  for (let i = 0; i < 1; i++) {
    reactionBtn[i].click();

    await page.waitForNavigation();
    await page.evaluate(() => document.querySelector('*').outerHTML);
  } */

  console.log('divs : ', divs);
  // console.log('Dimensions : ', dimensions);
  // console.log('Location Url : ', locationUrl);

  await browser.close();
})();
