import * as puppeteer from 'puppeteer'
// not sure why we are starting
// before
import loginDomain from './modules/login'

;(async () => {

  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await loginDomain.loginUser(page)
    console.log('Closing browser')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
