import * as cheerio from 'cheerio'

export interface TeeBooking {
  course: string
  date: string
  time: string
  players: PlayerSlot[]
}

export interface PlayerSlot {
  player: string | undefined
  slot: string | undefined
}

function parsePlayerSlot(playerSlotDiv: CheerioElement): PlayerSlot[] {
  const $ = cheerio.load(playerSlotDiv)
  const players: PlayerSlot[] = []
  $('div.player').each((i, playerDiv) => {
    players.push({
      player: playerDiv.lastChild.data ? playerDiv.lastChild.data!.trim() : 'singles',
      slot: playerDiv.children[1].firstChild.data
    })
  })
  return players
}
function parseTeeTime(tee: CheerioElement): TeeBooking {
  const $ = cheerio.load(tee)
  const players: PlayerSlot[] = []
  players: $('div.players').each((i, playersDiv) => {
    parsePlayerSlot(playersDiv)
  })
  return {
    course: 'Denham White',
    date: '',
    players,
    time: ''
  }
}
const teeSheet = {
  getTees: (teesForDayPageHTML: string) => {
    const $ = cheerio.load(teesForDayPageHTML, {
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: false
    })
    $('div.tee').each((i, teeTimeDiv) => {
      const tee = parseTeeTime(teeTimeDiv)
      console.log(tee)
    })
  }
}
export default teeSheet
