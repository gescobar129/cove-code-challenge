import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import moment from 'moment';

import { getReservations } from '../utils/reservations'
import { colors } from '../utils/theme'

const AvailabilityModal = (props) => {
  const {onDismiss, selectedRoom} = props
  const [reservationData, setReservationData] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment(Date.now()).format('YYYY-MM-DD'))

  const getRoomReservations = async (room, date) => {
    try {
      const reservations = await getReservations()
      const filteredReservationsByRoomAndDate = reservations.filter(reservation => reservation.room.id === room && moment(reservation.start).format('YYYY-MM-DD') === date)
      
      setReservationData(filteredReservationsByRoomAndDate)
    } catch (error) {
      console.log('error', error)
    } 
  }

  const renderReservationItem = ({ item }) => {
    let start = moment(item.start).format('LT')
    let end = moment(item.end).format('LT')

    return (
      <View style={styles.reservationItemView}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>
          {`${start} - ${end}`}
        </Text>
      </View>
    )
  }

  const renderEmptyReservationsView = () => {
    return (
      <View> 
        <Text>
          No Reservations Have Been Made Today
        </Text>
      </View>
    )
  }

  useEffect(() => {
    if (selectedRoom) {
      getRoomReservations(selectedRoom.id, selectedDate)
    }
  }, [selectedRoom, selectedDate])

  return (
    <React.Fragment>
      <TouchableOpacity 
        style={{ marginTop: 50, marginLeft: 35}}
        onPress={() => onDismiss()}
      >
        <Text style={{fontSize: 28}}>X</Text>
      </TouchableOpacity>
      <View style={styles.modalViewStyle}>
        <View style={styles.roomViewStyle}>
          <Image 
            style={styles.imageStyle}
            source={{uri: selectedRoom.imageUrl}}
          />
          <View style={{marginHorizontal:20}}>
            <Text style={styles.roomNameText}>{selectedRoom.name}</Text>
            <Text>Capacity 18 People</Text>
          </View>
        </View>
        <View style={styles.calendarViewStyle}>
          <Calendar 
            style={{paddingBottom: 20}}
            onDayPress={(day) => {setSelectedDate(day.dateString)}}
            markedDates={{
              [selectedDate]:{
                selected: true, 
              }
            }}
            theme={{
              todayTextColor: colors.coral,
              selectedDayTextColor: 'white',
              selectedDayBackgroundColor: colors.coral,
              arrowColor: colors.coral,
              textMonthFontSize: 23,
            }}
            minDate={moment().format('YYYY-MM-DD')}
          />
        </View>
        
          <View style={styles.reservedTimeView}>
            <Text style={styles.reservedTimeText}>Reserved Time Slots</Text>
            <FlatList 
              data={reservationData}
              renderItem={renderReservationItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.reservationFlatlist}
              numColumns={2}
              refreshing={true}
              ListEmptyComponent={() => renderEmptyReservationsView()}
            />
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  modalViewStyle: {
    flex: 1,
    justifyContent: 'center',
     marginBottom: 20
  },
  roomViewStyle: {
    flex:1, 
    borderWidth: 2, 
    borderColor: colors.lightCoral, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    backgroundColor: colors.lightCoral, 
    borderTopLeftRadius: 25, 
    borderBottomLeftRadius: 25, 
    marginLeft: 80, 
    marginBottom: 20
  },
  imageStyle: {
    height: 90,
    width: 130,
    borderRadius: 12, 
  },
  roomNameText: {
    fontWeight: 'bold', 
    marginBottom: 5, 
    fontSize: 18
  },
  calendarViewStyle: {
    flex:2.5, 
    paddingHorizontal: 20, 
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  reservedTimeView: {
    flex:2, 
    paddingHorizontal: 20,
    justifyContent: 'flex-start', 
  },
  reservedTimeText: {
    fontWeight: 'bold', 
    fontSize: 20, 
    color: colors.coral, 
    letterSpacing: 1,
    paddingTop: 20
  },
  reservationFlatlist: {
    flex:1, 
    justifyContent: 'center',
     alignItems: 'center'
  },
  reservationItemView: {
    borderWidth:1, 
    borderColor: colors.lightGrey, 
    borderRadius: 8, 
    padding: 8, 
    margin: 8, 
    backgroundColor: colors.lightGrey, 
    width: 150, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})

export default AvailabilityModal