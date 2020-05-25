import * as fs from 'fs'
import teeSheet from '../teeSheet'

const htmlSample = './testSample.html'
fs.readFile(htmlSample, 'utf8', (err, data) => {
  if (err) throw err
  teeSheet.getTees(data)
})
