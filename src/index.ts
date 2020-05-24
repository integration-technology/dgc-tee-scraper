import * as puppeteer from 'puppeteer'
// not sure why we are starting
// before
import loginDomain from './modules/login'
;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await loginDomain.loginUser(page)
    await page.waitFor(3000)
    await page.goto('https://denham.hub.clubv1.com/Members/TeeSheet?date=2020-05-24&courseId=7501')
    const source = await page.content()
    const bookings = await page.$eval('div.tee', (tee) => {
      console.log(tee)
    })
    console.log('Source: \n\n', source)
    console.log('Closing browser', bookings)
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
