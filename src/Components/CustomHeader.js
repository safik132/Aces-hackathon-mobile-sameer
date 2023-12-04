import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../assets/Aces1.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Image
          source={require("../../assets/notification.png")}
          style={styles.notificationIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Positions items on opposite ends
    flex: 1, // Take up full width
    paddingHorizontal: 10, // Add some padding on sides
  },
  logo: {
    width: 120,
    height: 30
  },
  notificationIcon: {
    width: 24,
    height: 24,
    marginLeft: 10
  }
});

export default CustomHeader;
