import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import FooterButtons from './FooterButtons';

function Awards() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>Prizes for Hack Revolution</Text>
        <Text style={{ ...styles.text, color: 'red', fontSize: 20, marginBottom: 10, textDecorationLine: 'underline' }}>
          Cash Prizes Worth ₹ 3,00,000/-
        </Text>

        <View style={styles.prizesContainer}>
          {/* 1st Prize */}
          <View style={styles.prizeItem}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/1.png')} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>₹ 40,000</Text>
              <Text style={styles.text1}>1st Prize</Text>
            </View>
          </View>

          {/* 2nd Prize */}
          <View style={styles.prizeItem}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/2.png')} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>₹ 25,000</Text>
              <Text style={styles.text1}>2nd Prize</Text>
            </View>
          </View>

          {/* 3rd Prize */}
          <View style={styles.prizeItem}>
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/3.png')} style={styles.icon} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text1}>₹ 10,000</Text>
              <Text style={styles.text1}>3rd Prize</Text>
            </View>
          </View>
        </View>

        <Text style={styles.text3}>Prizes worth ₹ 75,000 in each track</Text>
      </ScrollView>
      <FooterButtons />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollView: {
    flex: 1,
  },
  prizesContainer: {
    alignItems: 'center', // Center items horizontally
  },

  prizeItem: {
    alignItems: 'center', // Align items in each prize item to center
    marginVertical: 10, // Add some vertical margin for separation
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginTop: 8,
  },
  text1: {
    fontSize: 16,
    marginTop: 8,
    color: '#000',
  },
  text3: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E50035',
    marginTop: 18,
    marginBottom: 20,
  },
  textContainer: {
    marginLeft: 20,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    padding: 15,
    borderRadius: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default Awards;
