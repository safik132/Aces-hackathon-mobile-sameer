import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FooterButtons() {
  const [activeScreen, setActiveScreen] = useState('Home');
  const navigation = useNavigation(); // Using useNavigation hook to obtain the navigation object

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      if (e.data.state.routes.length > 0) {
        setActiveScreen(e.data.state.routes[e.data.state.index].name);
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Main'); // Navigate back to the Main screen
    } catch (e) {
      console.error(e); // Handle error, if any
    }
  };
  const renderButton = (iconName, text, screenName) => {
    if (typeof iconName === 'string') {
      // If it's a string, use MaterialIcons for icons
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screenName)}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons
                name={iconName}
                size={24}
                color={activeScreen === screenName ? 'red' : 'white'}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? 'red' : 'white' },
              ]}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } 
    else if (iconName === 'logout'){

      // If it's an image, use the Image component
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout }
        >
          <View style={styles.buttonContent}>
            <Image
              source={iconName}
              style={{
                width: 24, // Set the width and height as needed
                height: 24,
                tintColor: activeScreen === screenName ? 'red' : 'white',
              }}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? 'red' : 'white' },
              ]}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    else {
      // If it's an image, use the Image component
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screenName)}
        >
          <View style={styles.buttonContent}>
            <Image
              source={iconName}
              style={{
                width: 24, // Set the width and height as needed
                height: 24,
                tintColor: activeScreen === screenName ? 'red' : 'white',
              }}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? 'red' : 'white' },
              ]}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderButton('home', 'Home', 'Home')}
      {renderButton(require('../../assets/Registration.png'), 'Registration', 'Registration')}
      {renderButton(require('../../assets/logout.png'), 'logout', 'Main')}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#213966',
    padding: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 0,
  },
});

export default FooterButtons;
