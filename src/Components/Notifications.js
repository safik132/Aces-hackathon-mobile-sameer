import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import FooterButtons from "./FooterButtons";
import { getNotificationInbox } from "native-notify";

function Notifications() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    let notifications = await getNotificationInbox(
      15368,
      "ux61qbAfMOOHd6vFroOD7i"
    );
    const pushDataArray = notifications.map((notification) => {
      try {
        // Parsing the pushData JSON string into an object
        const pushDataObject = JSON.parse(notification.pushData);
        return pushDataObject;
      } catch (error) {
        console.error(
          `Error parsing pushData for notification_id ${notification.notification_id}: ${error.message}`
        );
        return null;
      }
    });

    // console.log(pushDataArray);
    const keysArray = pushDataArray.map((pushDataObject) => {
      const keys = Object.values(pushDataObject);
      return keys;
    });

    setValues(keysArray);
    setData(notifications);
  }, []);
  // useEffect(() => {
  //   console.log(pushDataObject, "test");
  // });
  const handlePress = (index) => {
    setSelectedImage(values[index]);
    setModalVisible(true);
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.notification_id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.main}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.date}</Text>
              <Text style={styles.text}>{item.message}</Text>
              {/* <TouchableOpacity onPress={() => handlePress(index)}>
                <Image
                  source={require("../../assets/HackRevolution.jpg")}
                  style={styles.modalImage1}
                />
              </TouchableOpacity> */}
            </View>
          );
        }}
      />
      {/* <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Image
            source={require("../../assets/HackRevolution.jpg")}
            style={styles.modalImage}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal> */}
      <FooterButtons />
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F3F3F3",
    paddingVertical: 20,
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 6,
  },
  icon1: {
    width: 350,
    height: 300,
    resizeMode: "contain",
    alignContent: "center",
    marginTop: 30,
    marginBottom: 300,
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
    textAlign: "left",
    color: "black",
    marginTop: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
    marginTop: 8,
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
