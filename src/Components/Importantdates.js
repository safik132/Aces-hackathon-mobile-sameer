import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,BackHandler} from 'react-native';
import FooterButtons from './FooterButtons';
import { useFocusEffect,useNavigation } from '@react-navigation/native';

function Importantdates() {
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Important Dates For Hack Revolution</Text>
        <Text style={styles.listItem}>• Registration and Abstract Submission: 11th Nov-23 - 25th Nov 23</Text>
        <Text style={styles.listItem}>• Announcement of shortlisted teams: 30th December 2023</Text>
        <Text style={styles.listItem}>• Registrations of shortlisted teams: 10th Dec 23</Text>
        <Text style={styles.listItem}>• Hackathon: 24th - 17 Nov 2023</Text>
        <Image source={require('../../assets/tl6.png')} style={styles.icon1} />
      </ScrollView>
      <FooterButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollView: {
    flex: 1,
  },
  icon1: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
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

export default Importantdates;
