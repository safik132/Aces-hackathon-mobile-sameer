import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
function Main() {
    const navigation = useNavigation();

  const redirectToHome = () => {
    // Use the navigation prop to navigate to the Home screen
    navigation.navigate('Home');
  };
  return (
    <View style={styles.Main}>
    <Text style={styles.text}>Welcome to</Text>
    <Image
           source={require('../../Images/b.png')}
           style={styles.icon}
         />
         <TouchableOpacity style={styles.button} onPress={redirectToHome}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    Main:{
        backgroundColor:'#213966',
        flex:1,
        justifyContent: 'center',
    alignItems: 'center',

    },
text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign:'center',
    color:'#fff',
    marginTop: 8, 
    
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width:"50%",
   alignItems:'center',
   marginBottom:128,
  },
  buttonText: {
    color: '#fff', // White text
    textAlign: 'center',
    fontSize: 16,
  },
  icon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignContent:'center',
   marginTop:10,
   
  },
});
export default Main
