import React from 'react'
import { View,Image,Text,StyleSheet,BackHandler } from 'react-native'
import FooterButtons from './FooterButtons';
import { useFocusEffect,useNavigation } from '@react-navigation/native';

function Events() {
  const navigation = useNavigation();
  // Inside your Importantdates component
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true; // Prevents default back button behavior
        }
        // Default behavior (exit the app) if no screens in the stack
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
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
    backgroundColor: '#F3F3F3', 
    flex: 1,
    justifyContent: 'space-between', // Distributes space evenly
  },
    icon1: {
        width: 350,
        height: 300,
        resizeMode: 'contain',
        alignContent:'center',
       marginTop:30
       
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
