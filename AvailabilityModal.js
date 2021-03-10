import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import moment from 'moment';

import { getReservations } from './utils/reservations'

const AvailabilityModal = (props) => {
  const {onDismiss, selectedRoom} = props
  const [reservationData, setReservationData] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment(Date.now()).format('YYYY-MM-DD'))
  const [loadingReservations, setLoadingReservations] = useState(false)
  console.log('selected day', selectedDate)

  const getRoomReservations = async (room, date) => {
    setLoadingReservations(true) 
    try {
      const reservations = await getReservations()
      const filteredByDate = reservations.filter(r => r.room.id && moment(r.start).format('YYYY-MM-DD') === date)

      setReservationData(filteredByDate)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoadingReservations(false)
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
            <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 18}}>{selectedRoom.name}</Text>
            <Text>Capacity 18 People</Text>
          </View>
        </View>
        <View style={{flex:2.5, paddingHorizontal: 20}}>
          <Calendar 
            style={{paddingBottom: 20}}
            theme={{
              todayTextColor: '#FF7770',
              // indicatorColor: '#FF7770',
              selectedDayTextColor: '#FF7770',
              arrowColor: '#FF7770',
              textMonthFontSize: 23,
            }}
            // selected={selectedDate}
            // minDate={}
            onDayPress={(day) => {setSelectedDate(day.dateString)}}
          />
        </View>
        {
          loadingReservations ? (
          <View style={styles.activityIndicatorViewStyle}>
            <ActivityIndicator 
              size='large'
              color='#FF7770'
            />
          </View>
          ) : (
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
          )
        }
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  activityIndicatorViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalViewStyle: {
    flex: 1,
    justifyContent: 'center',
     marginBottom: 20
  },
  roomViewStyle: {
    flex:1, 
    borderWidth: 2, 
    borderColor: '#FFEDEC', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    backgroundColor: '#FFEDEC', 
    borderTopLeftRadius: 25, 
    borderBottomLeftRadius: 25, 
    marginLeft: 80, 
    marginBottom: 20
  },
  imageStyle: {
    height: 90,
    width: 130,
    borderRadius: 12, 
    // marginRight: 20
  },
  reservedTimeView: {
    flex:2, 
    paddingHorizontal: 20,
    paddingTop: 30, 
    justifyContent: 'flex-start', 
    borderTopWidth: 1, 
    borderTopColor: '#CDCDCD',
  },
  reservedTimeText: {
    fontWeight: 'bold', 
    fontSize: 20, 
    color: '#FF7770', 
    letterSpacing: 1
  },
  reservationFlatlist: {
    flex:1, 
    justifyContent: 'center',
     alignItems: 'center'
  },
  reservationItemView: {
    borderWidth:1, 
    borderColor: '#CDCDCD', 
    borderRadius: 8, 
    padding: 8, 
    margin: 8, 
    backgroundColor: '#CDCDCD', 
    width: 150, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})

export default AvailabilityModal