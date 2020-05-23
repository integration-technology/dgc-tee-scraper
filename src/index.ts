import * as puppeteer from 'puppeteer'
// not sure why we are starting
// before

(async () => {
  const url = 'https://denham.hub.clubv1.com/Members/TeeSheet?date=2020-05-24&courseId=7501'

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    console.log('Got page')
    console.log('Closing browser')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
