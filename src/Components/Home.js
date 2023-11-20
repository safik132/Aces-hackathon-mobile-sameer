import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


import { useNavigation } from '@react-navigation/native';

import FooterButtons from './FooterButtons';

const Home = () => {
  const navigation = useNavigation();

  const data = [
    { image: require('../../Images/Img1.png'), screen: 'Home' },
    { image: require('../../Images/Img2.png'), screen: 'Home' },
    { title: 'Item 3', image: require('../../Images/Img2.png'), screen: 'Rules' },
    // Add more items as needed
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

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

  const boxesData = [
    { id: 1, label: 'Registrations', icon: require('../../Images/Registration.png'), screen: 'Registration' },
    { id: 2, label: 'Important Dates', icon: require('../../Images/Dates.png'), screen: 'Importantdates' },
    { id: 3, label: 'Tracks', icon: require('../../Images/Bullet.png'), screen: 'Tracks' },
    { id: 4, label: 'Awards', icon: require('../../Images/Prize.png'), screen: 'Awards' },
    { id: 5, label: 'Rules & Regulations', icon: require('../../Images/Rules.png'), screen: 'Rules' },
    { id: 6, label: 'Events', icon: require('../../Images/Event.png'), screen: 'Events' },
  ];

  const handleBoxPress = (item) => {
    // Navigate to the screen associated with the pressed box
    navigation.navigate(item.screen);
  };

  return (
    <View style={styles.container}>
     {/* <Swiper
        showsButtons={false}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        paginationStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.paginationDotActive}
      >
        {data.map((item, index) => renderItem(item, index))}
  </Swiper>*/}
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
      <FooterButtons />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    width:'90%',
    marginLeft:20,
   
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  paginationContainer: {
    marginTop: -60,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  paginationDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-around',
    marginBottom: 130,
  },
  box: {
    alignItems: 'center',
    width: '35%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default Home;
