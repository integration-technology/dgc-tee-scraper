import * as puppeteer from 'puppeteer'
// not sure why we are starting
// before

const LOGIN_SELECTOR = '#btn-passport-login'
const LOGIN_PAGE = 'https://denham.hub.clubv1.com/'

;(async () => {

  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(LOGIN_PAGE)
    console.log('Got page')
    const loginWindowPromise = new Promise((x) => page.once('popup', x))
    await page.click(LOGIN_SELECTOR)
    const loginWindow: any = await loginWindowPromise
    // @ts-ignore
    await loginWindow.click('#Username')
    await loginWindow.keyboard.type(process.env.EMAIL)
    await loginWindow.click('#Password')
    await loginWindow.keyboard.type(process.env.PASSWORD)
    await loginWindow.click('#RememberMe')
    await loginWindow.click('#form0 > div:nth-child(8) > input')
    console.log('Closing browser')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
