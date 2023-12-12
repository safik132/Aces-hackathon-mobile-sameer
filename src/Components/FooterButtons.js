import React, { useEffect, useState , useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext";

function FooterButtons() {
  const [activeScreen, setActiveScreen] = useState("Home");
   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation(); // Using useNavigation hook to obtain the navigation object

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      if (e.data.state.routes.length > 0) {
        setActiveScreen(e.data.state.routes[e.data.state.index].name);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if(!isLoggedIn) {
     
    }
  }, [isLoggedIn]);
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
  
  

  const renderButton = (iconName, text, screenName) => {
    if (typeof iconName === "string") {
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
              color={activeScreen === screenName ? "red" : "white"}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? "red" : "white" },
              ]}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (iconName === "logout") {
      // If it's an image, use the Image component
      return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Notifications')}>
          <View style={styles.buttonContent}>
            <Image
              source={iconName}
              style={{
                width: 24, // Set the width and height as needed
                height: 24,
                tintColor: activeScreen === screenName ? "red" : "white",
              }}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? "red" : "white" },
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
                tintColor: activeScreen === screenName ? "red" : "white",
              }}
            />
            <Text
              style={[
                styles.buttonText,
                { color: activeScreen === screenName ? "red" : "white" },
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
      
      {renderButton(
        require("../../assets/Registration.png"),
        "Registration",
        "Registration"
      )}
      {renderButton("home", "Home", "Home")}
      {renderButton(require("../../assets/notification.png"), "Notifications", "Notifications")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#213966",
    padding: 15,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    marginTop: 0,
  },
});

export default FooterButtons;
