import * as puppeteer from 'puppeteer'
import { format, eachDayOfInterval, add } from 'date-fns'
// import qs from 'qs'
import teeSheet, { TeeBooking } from './modules/teeSheet'

import loginDomain from './modules/login'
import { courses, Course } from './config/courses'

const baseURL = 'https://denham.hub.clubv1.com/Members/TeeSheet'

function getDaysArray(start: Date, dateWindowSize: number): string[] {
  const days = eachDayOfInterval({ start, end: add(start, { days: dateWindowSize }) })
  return days.map((dt) => format(dt, 'yyyy-MM-dd'))
}

async function getTeeBookings(page: puppeteer.Page, course: Course) {
  console.log(JSON.stringify(course, null, 2))
  // @ts-ignore
  const dateWindowSize: number = +process.env.DATE_WINDOW_SIZE || 7
  const returnTees: TeeBooking[][] = await Promise.all(
    getDaysArray(new Date(), dateWindowSize).map(async (sheetDate) => {
      console.log(`Course: ${course.name},  ${sheetDate}`)
      await page.goto(`${baseURL}?date=${sheetDate}&courseId=${course.id}`)
      const source = await page.content()
      console.log(`Got Page - Course: ${course.name},  ${sheetDate}`)
      const tees = await teeSheet.getTees(source)
      console.log(`Parsed Tees - Course: ${course.name},  ${sheetDate} Tees: ${tees.length}`)
      return tees
    })
  )
  console.log('Tee sheets returned:', returnTees.length)
  return returnTees
}

;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await loginDomain.loginUser(page)
    await page.waitFor(3000)
    const bookings: TeeBooking[][][] = await Promise.all(courses.map(async (course) => getTeeBookings(page, course)))
    console.log(JSON.stringify(bookings))
    console.log('Closing browser')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
  console.log('Finished')
})()
