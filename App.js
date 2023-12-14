import React, { useState, useEffect } from "react";
import { Image, StatusBar,TouchableOpacity,View,Animated } from "react-native";
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import registerNNPushToken, { getPushDataObject } from "native-notify";
import Home from "./src/Components/Home";
import Rules from "./src/Components/Rules";
import Registration from "./src/Components/Registration";
import SoloRegister from "./src/Components/Soloregistration";
import Tracks from "./src/Components/Tracks";
import Importantdates from "./src/Components/Importantdates";
import Awards from "./src/Components/Awards";
import Events from "./src/Components/Events";
import Main from "./src/Components/Main";
import Notifications from "./src/Components/Notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ExpoNotifications from 'expo-notifications';
import * as MediaLibrary from 'expo-media-library';
import { AuthProvider } from "./src/Components/AuthContext";
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';
const Stack = createStackNavigator();



function App() {
  const [initialRoute, setInitialRoute] = useState("Main"); // Default to 'Main'
  // Custom Header with Notification Icon
  
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
  useEffect(() => {
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log("Token check:", token); // Debugging log
      if (token) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("Main");
      }
    } catch (e) {
      console.error('Error reading token', e);
    }
  };

  checkToken();
}, []);

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

  useEffect(() => {
    
    checkForUpdates();
  }, []);
  
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "Update Available",
          "New version of the app is available. Do you want to update?",
          [
            { text: "Later", onPress: () => console.log("Update postponed") },
            { text: "Update", onPress: () => doUpdate() }
          ]
        );
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const doUpdate = async () => {
    await Updates.fetchUpdateAsync();
    Updates.reloadAsync();
  };
  
  return (
    <AuthProvider>
    <StatusBar 
        barStyle="light-content" // Makes text/icons dark
        backgroundColor="#213966" // Sets background to white
      />
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} // Hide the header
        />
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: null,
              headerTitle: () => <CustomHeader />,
            }}
          />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Registration" options={{ headerShown: false }} component={Registration} />
        <Stack.Screen name="SoloRegister" options={{ headerShown: false }} component={SoloRegister} />
        <Stack.Screen name="Tracks" component={Tracks} />
        <Stack.Screen name="Important dates" component={Importantdates} />
        <Stack.Screen name="Awards" component={Awards} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Notifications" component={Notifications} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}

export default App;