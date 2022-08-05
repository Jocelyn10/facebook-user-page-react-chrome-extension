/*fetch('https://companyleagues-api.herokuapp.com/api/challenge/custom').then(r => r.json()).then(result => {
    // Result now contains the response text, do what you want...
    console.log("Result : ", result)
}) */

const fs = require("fs");
const puppeteer = require("puppeteer");
const { FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require("./config");

// if screenshots directory is not exist then create one
if (!fs.existsSync("screenshots")) {
  fs.mkdirSync("screenshots");
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto("https://www.facebook.com/", { timeout: 0 });
  console.log("🤖🤖🤖🤖🤖 WAITING FOR LOGIN INPUTS 🤖🤖🤖🤖🤖🤖");
  await page.waitForSelector('input[name="email"]');

  await page.type('input[name="email"]', FACEBOOK_EMAIL);
  await page.type('input[name="pass"]', FACEBOOK_PASSWORD);
  await page.keyboard.press("Enter");

  console.log("🤖🤖🤖🤖🤖 LOGING 🤖🤖🤖🤖🤖🤖");

  await page.waitForNavigation({ waitUntil: "networkidle2" });
  

  console.log("🤖🤖🤖🤖🤖 GOING TO THE POST 🤖🤖🤖🤖🤖🤖");

  await page.goto(
    "https://web.facebook.com/frendlyblog/posts/pfbid0rCRp7Qm7YGTj4Mjn4SyuPnZqRHfTATsfbpfEK14PtwwTpkhGDpcU772m4r6DiEgcl",
    { waitUntil: "networkidle2", timeout: 0 }
  );

  console.log("🤖🤖🤖🤖🤖 CLICK ON LIKE BTN 🤖🤖🤖🤖🤖🤖");
  
  await page.waitForSelector('img[role="presentation"]');
  await page.click('img[role="presentation"]');

  page.waitForNavigation({ waitUntil: "networkidle0" });

  await page.waitForSelector('div[aria-label="Fermer"]');

  await delay(7000);

  console.log("🤖🤖🤖🤖🤖 GETING DATA FROM MODAL 🤖🤖🤖🤖🤖");

  const links = await page.$$eval('div[role="dialog"]', (divs) =>
    divs.map((div) => {
      return {
        html: div.innerHTML,
      };
    })
  );

  const modal = links[1];

  var patt = /<a[^>]*label=["']([^"']*)["']/g;


  console.log("🤖🤖🤖🤖🤖 PERSONS WHO LIKE THE POST 🤖🤖🤖🤖🤖🤖");
  console.log("                                             ");
  console.log("                                             ");
  console.log("                ---🤖---                     ");
  while(match=patt.exec(modal.html)){
    console.log(match[1]);
  }
  console.log("                ---🤖---                     ");

  await browser.close();
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}