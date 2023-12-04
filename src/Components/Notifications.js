import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList, StyleSheet ,BackHandler} from "react-native";
import FooterButtons from "./FooterButtons";
import { getNotificationInbox } from "native-notify";
import { useFocusEffect,useNavigation } from '@react-navigation/native';

function Notifications() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
      try {
        let notifications = await getNotificationInbox(
          15368,
          "ux61qbAfMOOHd6vFroOD7i"
        );

        const pushDataArray = notifications.map((notification) => {
          try {
            const pushDataObject = JSON.parse(notification.pushData);
            return pushDataObject;
          } catch (error) {
            console.error(
              `Error parsing pushData for notification_id ${notification.notification_id}: ${error.message}`
            );
            return null;
          }
        });

        const keysArray = pushDataArray.map((pushDataObject) => {
          const keys = Object.values(pushDataObject);
          return keys;
        });

        setValues(keysArray);
        setData(notifications);
      } catch (error) {
        console.error(`Error fetching notifications: ${error.message}`);
        // Handle errors if necessary
      }
    };

    // Call the async function immediately
    fetchData();
  }, []);
  // useEffect(() => {
  //   console.log(pushDataObject, "test");
  // });
  const handlePress = (index) => {
    setSelectedImage(values[index]);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.notification_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.date}</Text>
            <Text style={styles.text}>{item.message}</Text>
            {/* Other components */}
          </View>
        )}
      />
      {/* Modal component if used */}
    </View>
    <FooterButtons />
  </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 6,
    
  },
  main1: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    
    
  },
  icon1: {
    width: 350,
    height: 300,
    resizeMode: "contain",
    alignContent: "center",
    marginTop: 30,
    marginBottom: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  notificationItem: {
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
  modalImage1: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    flex: "right",
    marginLeft: "330px",
  },
});
export default Notifications;
