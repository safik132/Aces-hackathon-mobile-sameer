import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FooterButtons from './FooterButtons';
function Importantdates() {
  return (
    <View style={styles.main}>
    <Text  style={styles.text}>Important Dates For Hack Revolution</Text>
    <Text style={styles.listItem}>• Registration and Abstract Submission: 11th Nov-23 - 25th Nov 23</Text>
    <Text style={styles.listItem}>• Announcement of shortlisted teams: 30th December 2023</Text>
    <Text style={styles.listItem}>• Registrations of shortlisted teams: 10th Dec 23</Text>
    <Text style={styles.listItem}>• Hackathon: 24th - 17 Nov 2023</Text>
    <Image
   source={require('../../Images/tl6.png')}
   style={styles.icon1}
 />
 
 <FooterButtons />
    </View>
    
  )
}

const styles = StyleSheet.create({
    main: {
      flex:1,
      backgroundColor:'#F3F3F3',
        paddingVertical: 20,
      },
    icon1: {
        width: 350,
        height: 300,
        resizeMode: 'contain',
        alignContent:'center',
       marginTop:30,
       marginBottom:128,
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#213966',
        marginTop: 8,
      },
      listItem: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        color: '#213966',
      },
});

export default Importantdates
