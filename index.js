const puppeteer = require('puppeteer');
const fs = require('fs')
const ws = fs.createWriteStream('a.txt',{'flags': 'a'})
async function go() {
  const browser = await puppeteer.launch()
  for (let i = 0; i < 100; i++) {
    const page = await browser.newPage();
    await page.goto('https://superapp.kiwa-tech.com/weexWeb/index.html?page=stores-detailed.web.js&moduleId=stores&storeId=020151');
    await page.waitForSelector('.wait-row-num > div');
    const inputElement = await page.$$eval('.wait-row-num > div', nodes => nodes.map(el => el.children[0].children[0].innerText));
    console.log(inputElement);
    ws.write(`${new Date().getTime()} ${inputElement.toString()}\n`)
    await page.close()
    await sleep(300000)
  }
}
go()
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}