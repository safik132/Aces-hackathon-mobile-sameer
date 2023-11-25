import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import FooterButtons from './FooterButtons';

function Tracks() {
  return (
    <View style={styles.main}>
    <ScrollView>
      <View>
        <Text style={styles.text}>Tracks for Hack Revolution</Text>
      </View>
      {/* First Box */}
      <View style={styles.box}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/fintech.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text1}>Fintech</Text>
        <Text style={styles.text2}>Shape the future of finance in the Fintech pathway by exploring blockchain and other cutting-edge financial innovations. Whether you are developing disruptive payment solutions or innovative financial apps, this pathway invites you to redefine the landscape where tech and finance converge.</Text>
      </View>

      <View style={styles.box}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/hard.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text1}>Generic Hardware</Text>
        <Text style={styles.text2}>Get into cool tech stuff with the Generic Hardware pathway. If you like circuitry or building hardware, this track lets you turn your ideas into real gadgets.</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/healthcare.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text1}>Health Care</Text>
        <Text style={styles.text2}>Mix tech and healthcare in this pathway, where your ideas could make a big difference in how we care for people. It is open to tech lovers and healthcare folks alike.</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/software.png')}
            style={styles.icon}
          />
        </View>
        <Text style={styles.text1}>Generic Software</Text>
        <Text style={styles.text2}>Discover the world of computer magic in the Generic Software pathway. It is all about creating cool things like websites and mobile apps. Whether you are a coding whiz or just getting started, dive into crafting awesome digital solutions!</Text>
      </View>
    </ScrollView>
<FooterButtons/>
    </View>
  );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        color:'#213966',
        marginTop: 8, 
        
      },
      box: {
        alignItems: 'center',
      },
      iconContainer: {
        width: 80, // Adjust the size of the container as needed
        height: 80, // Adjust the size of the container as needed
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 45, // Set half of the width or height to create a circular shape
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Padding for the circular container
      },
      icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderColor: '#000',
        
        // backgroundColor: '#',
        padding: 15, // Padding for the image inside the circular container
        borderRadius: 10, // Set half of the width or height to create a circular shape
      },
      text1:{
        fontSize: 16,
        marginTop: 8, 
        color:'#213966',
        
      },
      text2:{
        fontSize: 14,
        marginTop: 8, 
        color:'#000',
        alignContent:'center',
        textAlign:'center',
        padding:10,
      },
      main: {
  
        backgroundColor:'#F3F3F3',
        flex:1,
      },
});

export default Tracks;
