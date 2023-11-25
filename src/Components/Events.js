import React from 'react'
import { View,Image,Text,StyleSheet } from 'react-native'
import FooterButtons from './FooterButtons';

function Events() {
  return (
    <View style={styles.main}>
    
    <Image
   source={require('../../assets/HackRevolution.jpg')}
   style={styles.icon1}
 /> 
 <FooterButtons/>
    </View>
  )
}
const styles = StyleSheet.create({
    main: {
      backgroundColor:'#F3F3F3',
        paddingVertical: 20,
        flex:1,
      },
    icon1: {
        width: 350,
        height: 300,
        resizeMode: 'contain',
        alignContent:'center',
       marginTop:30,
       marginBottom:300,
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        color:'#fff',
        marginTop: 8, 
        
      },
});
export default Events
