import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, Image } from 'react-native';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'ec4d9c0f0a9b1dbe1bcd36a32a040bd1';
const ICON_URL = 'http://openweathermap.org/img/wn/';


export default function Weather(props) {
  const [temp,setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const url = API_URL +
    'lat=' + props.latitude +
    '&lon=' + props.longitude +
    '&units=metric' +
    '&appid=' + API_KEY;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => { 
        setTemp(result.main.temp);
        setDescription(result.weather[0].description);
        setIcon(ICON_URL +  result.weather[0].icon + '@2x.png');
      },
      (error) => { 
        console.log(error);
      }     
    ) 
   
  }, [])

  return (
    <>
      <Text style={styles.label}>Temperature</Text>
      <Text> {temp}</Text>
      <Text style={styles.label}>Description</Text>
      <Text>{description}</Text>
      <Image source={{uri: icon}} style={{width: 100,height: 100}}/>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  }
});