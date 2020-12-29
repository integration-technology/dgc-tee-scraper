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
  const players: any[] = []
  $('div.players').each((i, playersDiv) => {
    players[0] = parsePlayerSlot(playersDiv)
  })
  const [teeDate, teeTime] = tee.attribs['data-teetime'].split(' ')
  return {
    course: 'Denham White',
    date: teeDate,
    players,
    time: teeTime
  }
}
const teeSheet = {
  getTees: async (teesForDayPageHTML: string): Promise<TeeBooking[]> => {
    const $ = cheerio.load(teesForDayPageHTML, {
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: false
    })
    const teeBookings: TeeBooking[] = []
    $('div.tee').each((i, teeTimeDiv) => {
      const tee = parseTeeTime(teeTimeDiv)
      teeBookings.push(tee)
    })
    return teeBookings
  }
}
export default teeSheet
