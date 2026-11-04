import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', headless:true });
try {
 const page=await browser.newPage();
 const routes=['/','/about/','/dr-biswaroop-roy-chowdhury/','/dip-diet/','/circadian-approach/','/resources/','/publications/','/gallery/','/contact/'];
 for(const width of [320,375,768,1440]) {
  await page.setViewport({width,height:900});
  for(const route of routes) {
   await page.goto('http://127.0.0.1:4321'+route,{waitUntil:'networkidle0'});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow: ${width} ${route}`);
   assert(await page.$eval('.brand-symbol',el=>el.complete&&el.naturalWidth>0),'Official logo not loaded');
   assert(await page.$eval('.brand-symbol',el=>el.src.includes('/brand/circadian-logo-256.webp')));
  }
 }
 await page.setViewport({width:375,height:812});
 await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle0'});
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const visible=await page.$eval('[data-menu-toggle]',el=>{const r=el.getBoundingClientRect();return r.x>=0&&r.right<=innerWidth});
 assert(visible,'Navigation control clipped at large text size');
 await page.screenshot({path:'.qa/mobile-large-text.png',fullPage:true});
 await page.evaluate(()=>document.documentElement.style.fontSize='');
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 assert.equal(await page.$eval('html',el=>getComputedStyle(el).scrollBehavior),'auto');
 await page.setViewport({width:1440,height:1000});
 await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle0'});
 for(const theme of ['light','dark']) {
  await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  await page.screenshot({path:`.qa/redesign-${theme}-fold.png`});
 }
 console.log('PASS: 9 routes at 4 widths; official logo; large-text navigation; reduced motion; light/dark render captures.');
}finally{await browser.close();}
