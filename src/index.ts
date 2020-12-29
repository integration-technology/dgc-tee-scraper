// import qs from 'qs'
import * as puppeteer from 'puppeteer'
import teeSheet, { TeeBooking } from './modules/teeSheet'

import loginDomain from './modules/login'
import { courses, Course } from './config/courses'

const baseURL = 'https://denham.hub.clubv1.com/Members/TeeSheet'

async function getTeeBookings(page: puppeteer.Page, course: Course) {
  console.log(JSON.stringify(course, null, 2))
  const queryParameters = {
    date: '2020-12-29',
    courseId: course.id
  }
  // const queryParametersString = qs.stringify(queryParameters)
  await page.goto(`${baseURL}?date=${queryParameters.date}&courseId=${course.id}`)
  // await page.goto([baseURL, queryParametersString].join('?'))
  const source = await page.content()
  return teeSheet.getTees(source)
}

;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await loginDomain.loginUser(page)
    await page.waitFor(3000)
    const bookings: TeeBooking[][] = await Promise.all(courses.map(async (course) => getTeeBookings(page, course)))
    console.table(bookings)
    console.log('Closing browser')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
