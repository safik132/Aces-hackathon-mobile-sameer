import React, { useState, useEffect,useContext } from "react";
import { Image, StatusBar,TouchableOpacity,View,Animated } from "react-native";
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import registerNNPushToken, { getPushDataObject } from "native-notify";
import Home from "./src/Components/Home";
import Rules from "./src/Components/Rules";
import Registration from "./src/Components/Registration";
import Tracks from "./src/Components/Tracks";
import Importantdates from "./src/Components/Importantdates";
import Awards from "./src/Components/Awards";
import Events from "./src/Components/Events";
import Main from "./src/Components/Main";
import Notifications from "./src/Components/Notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ExpoNotifications from 'expo-notifications';
import * as MediaLibrary from 'expo-media-library';
import {AuthContext } from "./src/Components/AuthContext";

const Stack = createStackNavigator();



function MainApp() {
   // Default to 'Main'
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  // Custom Header with Notification Icon
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };

    checkToken();
  }, [setIsLoggedIn]);
  const CustomHeader = () => {
    const navigation = useNavigation();
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Image
          source={require("./assets/Aces1.png")}
          style={{ width: 120, height: 30 }}
          resizeMode="contain"
        />
        <TouchableOpacity 
          onPress={() => navigation.navigate('Notifications')}
          style={{ padding: 10 }} // Padding for easier touch
        >
          <Image
            source={require("./assets/notification.png")} // Replace with your notification icon path
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  
  const requestPermissions = async () => {
    // Request Notification Permissions
    const notificationStatus = await ExpoNotifications.requestPermissionsAsync();
    if (notificationStatus.status !== 'granted') {
      console.log('Notification Permission Not Granted');
    }

    // Request Media Library Permissions
    const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
    if (mediaLibraryStatus.status !== 'granted') {
      console.log('Media Library Permission Not Granted');
    }
  };

  requestPermissions();
  
  registerNNPushToken(15368, "ux61qbAfMOOHd6vFroOD7i");
  return (
    
    
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Main">
     
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: () => <CustomHeader /> }}
          />
          {/* Other screens for logged-in users */}
        </>
      ) : (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      )}
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Tracks" component={Tracks} />
        <Stack.Screen name="Important dates" component={Importantdates} />
        <Stack.Screen name="Awards" component={Awards} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Notifications" component={Notifications} />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default MainApp;