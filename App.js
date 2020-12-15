import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [latitude,setLatitude] = useState(0);  
  const [longitude,setLongitude] = useState(0); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation().then(() => {
      setLoading(false);
    })
  }, [])

  const getLocation = async () => {
    const reply = await Permissions.askAsync(Permissions.LOCATION);
    if (reply.granted) {
      const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);  
    }
  };

  if (loading) { 
    return <View style={styles.container}><Text>Loading...</Text></View>
  }
  else {
    return (
      <View style={styles.container}>
        <Text>Location:</Text>
        <Text>{latitude}</Text>
        <Text>{longitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
