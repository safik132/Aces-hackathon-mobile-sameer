import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function CustomHeader() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleRulesPress = () => {
    navigation.navigate('Rules');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Registration');
  };

  // Reset the state when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      setIsDrawerOpen(false);
    }, [])
  );

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={toggleDrawer}>
        <MaterialIcons name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={isDrawerOpen} transparent={true} animationType="slide">
        <View style={styles.drawer}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Drawer Content */}
          <Text style={styles.drawerText}>Hackathon</Text>
          <View style={styles.divider} />
          <TouchableOpacity onPress={handleRulesPress}>
            <Text style={styles.drawerItem}>Rules & Regulations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.drawerItem}>Registrations</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#213966',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#213966',
    width: 170,
    marginBottom: 1,
    marginTop: 60,
  },
  closeButton: {
    padding: 10,
  },
  drawerText: {
    color: 'white',
    paddingLeft: 30,
    fontSize: 17.5,
  },
  drawerItem: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 30,
    textDecorationLine: 'none',
    paddingLeft: 30,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 10,
  },
});

export default CustomHeader;
