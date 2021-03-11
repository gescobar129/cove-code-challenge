import { get } from './api'
import { RESERVATIONS_ENDPOINT } from '@env'

export const getReservations = async () => {
  try {
    let reservations = await get(RESERVATIONS_ENDPOINT)

    return reservations
  } catch (e) {
    console.log('error', e)
  }
}

export const getRoomData = async () => { 
  let data = {}
  let rooms =[]
  try {
    let reservations = await getReservations()

    reservations.forEach((reservation) => {
      if (!data[reservation.room.id]) {
        data[reservation.room.id] = reservation.room
      }
    })

    for (const property in data) {
      rooms.push({
        property: data[property]
      })
    }
  } catch (error) {
    console.log('error',error)
  }
  return rooms
}
