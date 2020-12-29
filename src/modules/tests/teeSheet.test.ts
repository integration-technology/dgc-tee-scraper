import * as fs from 'fs'
import * as util from 'util'
import teeSheet, { TeeBooking } from '../teeSheet'

const dataFiles = ['../../../samples/denham-7501_2020-05-23.html', '../../../samples/denham-7501_2020-05-24.html']
const readFile = util.promisify(fs.readFile)

async function readTeeSheets() {
  let slots: TeeBooking[] = []
  const sheets = await dataFiles.map(async (file) => {
    const html = await readFile(file).toString()
    const results = await teeSheet.getTees(html)
    slots = [...results]
  })
  console.log(sheets.length)
  return slots
}

;(async () => {
  const results = await readTeeSheets()
  console.log('Number of slots: ', results.length)
})()
