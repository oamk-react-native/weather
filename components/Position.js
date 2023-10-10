import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Weather from './Weather';

export default function Position() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitde] = useState(0)
  const [message, setMessage] = useState('Retrieving location...')
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      try {
        if (status !== 'granted') {
          setMessage("Location not permitted.")

        } else {      
          const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
          setLatitude(position.coords.latitude)
          setLongitde(position.coords.longitude)
          setMessage('Location retrieved')
        }
      } catch (error) {
        setMessage("Error retrieving location.")
        console.log(error)
      }
      setIsloading(false)
    })()
  }, [])
  
  return (
    <View>
      <Text style={styles.coords}>{latitude.toFixed(3)},{longitude.toFixed(3)}</Text>
      <Text style={styles.message}>{message}</Text>
      {isLoading === false && 
        <Weather latitude={latitude} longitude={longitude} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  coords: {
    marginBottom: 8
  },
  message: {
    marginBottom: 8,
    fontWeight: '600'
  }
});
