import React, { useState, useCallback,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,BackHandler,Alert,Animated,Button } from "react-native";
import Swiper from 'react-native-web-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

import FooterButtons from "./FooterButtons";


const Home = () => {
  const navigation = useNavigation();
  const [registrationIcon, setRegistrationIcon] = useState(require("../../assets/Registration.png"));
  

  const handleIconChange = () => {
    // Update the registration icon based on your logic
    setRegistrationIcon(require("../../assets/Registration.png"));
  };

  const av = new Animated.Value(0);
  av.addListener(() => {return});

  const data = [
    { image: require("../../assets/Img1.png"), screen: "Home" },
    { image: require("../../assets/comingsoon.png"), screen: "Home" }
    
    // Add more items as needed
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);
 // Inside your Home component
useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
);
  const renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.slide}
      onPress={() => handleImagePress(item)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleImagePress = (item) => {
    // Navigate to the screen associated with the pressed image
    navigation.navigate(item.screen);
  };
  const handleLogout = async () => {
    try {
      // Clear token and other related data
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('isLoggedIn');

      // Navigate to the Main page
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Logout failed', 'Please try again.');
    }
  };
  const boxesData = [
    {
      id: 1,
      label: "Registrations",
      icon: require("../../assets/Registration.png"),
      screen: "Registration",
    },
    {
      id: 2,
      label: "Important Dates",
      icon: require("../../assets/Dates.png"),
      screen: "Important dates",
    },
    {
      id: 3,
      label: "Tracks",
      icon: require("../../assets/Bullet.png"),
      screen: "Tracks",
    },
    {
      id: 4,
      label: "Awards",
      icon: require("../../assets/Prize.png"),
      screen: "Awards",
    },
    {
      id: 5,
      label: "Rules & Regulations",
      icon: require("../../assets/Rules.png"),
      screen: "Rules",
    },
    {
      id: 6,
      label: "Events",
      icon: require("../../assets/Event.png"),
      screen: "Events",
    },
    
  ];

  const handleBoxPress = (item) => {
    // Navigate to the screen associated with the pressed box
    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
     { <Swiper
      controlsProps={{prevPos:false, nextPos:false}}
      showsButtons={false}
      loop={false}
      onIndexChanged={(index) => setActiveIndex(index)}
      paginationStyle={styles.paginationContainer}
      dotStyle={styles.paginationDot}
      activeDotStyle={styles.paginationDotActive}
      nextButtonStyle={styles.swiperButton}
      prevButtonStyle={styles.swiperButton}
    >
        {data.map((item, index) => renderItem(item, index))}
      </Swiper>}
      <View style={styles.row}>
        {boxesData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.box}
            onPress={() => handleBoxPress(item)}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        
</View>
<View style={styles.footer}>
{/* Registration Button */}
<TouchableOpacity
  style={styles.footerButton}
  onPress={() => navigation.navigate('Registration')}
>
  <Image source={registrationIcon} style={{ width: 20, height: 20 ,tintColor:"white"}} />
  <Text style={styles.footerButtonText}>Registration</Text>
</TouchableOpacity>
 

{/* Home Button */}
<TouchableOpacity style={styles.footerButton}>
 <MaterialIcons name="home" size={20} color="white" />
 <Text style={styles.footerButtonText}>Home</Text>
</TouchableOpacity>
{/* Logout Button */}
<TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
<MaterialIcons name="exit-to-app" size={20} color="white" />
<Text style={styles.footerButtonText}>Logout</Text>
</TouchableOpacity>


</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff'
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    width: '100%', // Ensure the slide takes full width
  },
  customButton: {
    backgroundColor: '#FFFFFF', // White background
    paddingVertical: 0,
    paddingHorizontal: 20,
    borderRadius: 5,
    // Add other styling as needed
  },
  buttonText: {
    color: '#000', 
    textAlign: 'center',
  },
  image: {
    width: '100%', // Full width of the slide
    flex: 1,       // Take the remaining space of the slide
    borderRadius: 20,
    resizeMode: 'contain' // Ensure the image is scaled properly
  },
  logoutIcon: {
    width: 24,      // Set the width of the icon
    height: 24,     // Set the height of the icon
    marginBottom: 10,
    backgroundColor:"#213966" // Space between the icon and the button
  },
  title: {
    fontSize: 20,
    marginTop: 10
  },

  paginationContainer: {
    paddingVertical: 20
  },

  paginationDot: {
    width: 10,
    borderRadius: 5, 
    backgroundColor: '#333',
    marginHorizontal: 5
  },

  paginationDotActive: {
    width: 15, 
    borderRadius: 10,
    backgroundColor: '#000' 
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',  
    justifyContent: 'space-around',
    alignItems: 'center', // Align items vertically
  },

  box: {
    alignItems: 'center',
    width: '40%',
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    height: 80, // Specify a fixed height
  },

  logoutButton: {
    alignItems: 'center',
    width: '40%',
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    height: 80, // Same height as boxes
    justifyContent: 'center' // Center content vertically
  },

  icon: {
    width: 30,
    height: 30,
    marginBottom: 5
  },

  label: {
    fontSize: 12
  },

  swiperButton: {
    display: 'none', // Hide buttons
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#213966',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Add a border to separate footer from content
  },
  buttonIcon: {
    width: 20,   // Set your desired width
    height: 20,  // Set your desired height
    marginRight: 5,  // Add some margin to the right of the icon
  },
  footerButton: {
    alignItems: 'center',  // Center items horizontally in the column
    justifyContent: 'center', // Center items vertically
    padding: 10,
    backgroundColor: '#213966',
    borderRadius: 5,
    flexDirection: 'column',  // Layout children in a column
  },
  footerButtonText: {
    color: '#fff',
    marginTop: 5, // Add some space between the icon and the text
  },
});

export default Home;
