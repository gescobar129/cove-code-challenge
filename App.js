import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

import { getRoomData } from './utils/reservations'
import AvailabilityModal from './AvailabilityModal';

const App = () => {
  const [roomData, setRoomData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState('')
  
  const getRooms = async () => {
    setIsLoading(true)
    try {
      const res = await getRoomData()
      setRoomData(res)
    } catch (error) {
      console.log('error', error) 
    } finally {
      setIsLoading(false)
    }
  }

  const renderRoomItem = ({item}) => {
    return (
      <View style={styles.cardStyle}>
        <View style={{ alignItems: 'center'}}>
          <Image 
            style={styles.imageStyle}
            source={{uri: item.property.imageUrl}}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.mainTextStyle}>{item.property.name}</Text>
          <Text style={styles.subTextStyle}>Capacity 18 People</Text>
          <Text style={styles.descriptionTextStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate.
          </Text>
        </View>

        <View style={styles.availabilityButtonView}>
          <TouchableOpacity 
            style={styles.availabilityButtonTouchable}
            onPress={() => {
              setSelectedRoom(item.property)
              setModalVisible(true)
            }}
          >
            <Text style={styles.availabilityButtonText}>See Availability</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderEmptyView = () => {
    return (
      <View style={styles.emptyViewStyle}>
        <Text style={styles.emptyViewText}>
          No Rooms Available
        </Text>
      </View>
    )
  }

  useEffect(() => {
      getRooms()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fbfcfc' }}>
      {isLoading ? (
        <View style={styles.activityIndicatorViewStyle}>
          <Text style={styles.activityIndicatorTextStyle}>One Moment ...</Text>
          <ActivityIndicator 
            size='large'
            color='#FF7770'
          />
        </View>
      ): (
     <React.Fragment>
       <View style={styles.headerViewStyle}>
         <Text style={styles.headerTextStyle}>Select A Room To Reserve</Text>
       </View>
         <FlatList 
          data={roomData}
          renderItem={renderRoomItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainerStyle}
          ListEmptyComponent={renderEmptyView}
         />

      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <AvailabilityModal 
          onDismiss={() => setModalVisible(false)}
          selectedRoom={selectedRoom}
        />
      </Modal>
     </React.Fragment>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activityIndicatorViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorTextStyle: {
    paddingBottom: 30, 
    color: '#CDCDCD', 
    fontSize: 40, 
    fontWeight: 'bold'
  },
  headerViewStyle: {
    padding: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  headerTextStyle: {
    fontWeight: 'bold', 
    fontSize: 18, 
    color: '#FF7770', 
    letterSpacing: 2
  }, 
  flatListContainerStyle: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-evenly', 
    // backgroundColor:'#fbfcfc',
  },
  cardStyle:{
    borderWidth: 3, 
    justifyContent: 'space-evenly',
    borderWidth:1, 
    borderRadius: 24, 
    borderColor: '#fbfcfc',
    padding: 20, 
    backgroundColor:'white',
    shadowColor: '#767676',
    shadowOpacity: .2,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1
    }, 
  },
  imageStyle: {
    width: 270, 
    height: 120, 
    borderRadius: 20, 
    marginBottom: 15
  },
  mainTextStyle: {
    fontWeight: 'bold', 
    fontSize: 25, 
    marginBottom: 8
  },
  subTextStyle: {
    marginBottom: 8, 
    fontSize: 12,  
    letterSpacing: 2, 
    fontWeight: 'bold'
  },
  descriptionTextStyle: {
    fontSize: 10, 
    lineHeight: 14, 
    color: 'grey'
  },
  availabilityButtonView: {
    marginTop: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  availabilityButtonTouchable: {
    borderWidth: 2, 
    borderColor: '#FF7770', 
    borderRadius: 20, 
    padding: 10, 
    backgroundColor: '#FF7770'
  },
  availabilityButtonText: {
    fontWeight: 'bold', 
    color: 'white'
  },
  emptyViewStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20
  },
  emptyViewText: {
    fontSize: 30, 
    color: '#FF7770', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
})

export default App