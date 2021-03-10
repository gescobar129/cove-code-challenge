import { get } from './api'
import { RESERVATIONS_ENDPOINT } from '@env'

export const getReservations = async () => {
  try {
    let res = await get(RESERVATIONS_ENDPOINT)

    return res
  } catch (e) {
    console.log('error', e)
  }
}

export const getRoomData = async () => { 
  let data = {}
  let rooms =[]
  try {
    let res = await getReservations()

    res.forEach((e) => {
      if (!data[e.room.id]) {
        data[e.room.id] = e.room
      }
    })

    for (const property in data) {
      rooms.push({
        property: data[property]
      })
    }
  } catch (error) {
    console.log(error)
  }
  return rooms
}
