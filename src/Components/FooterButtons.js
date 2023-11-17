import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

  const handleDiscover = () => {
    // Navigate to the Discover screen
    navigation.navigate('Registration');
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
    } else {
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
      {renderButton(require('../../Images/Registration.png'), 'Registration', 'Registration')}
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
