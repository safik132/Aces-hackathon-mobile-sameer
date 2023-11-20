import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Main = () => {
  const navigation = useNavigation();

  // State variables
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setOtp('');
  };

  // Send OTP to email
  const sendOtp = async (email) => {
    try {
      await axios.post('http://localhost:5000/api/send-otp', { email });
      Alert.alert('OTP sent to your email');
    } catch (err) {
      console.error(err);
      Alert.alert('Error sending OTP');
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Please fill all fields');
      return;
    }

    sendOtp(email);
  };

  // Verify OTP for registration
  const verifyOtpAndRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/registeruser', {
        name,
        email,
        phone,
        otp
      });

      Alert.alert('Registration successful');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Registration failed');
    }
  };

  // Handle login
  const handleLogin = async () => {
    sendOtp(email);
  };

  // Verify OTP for login
  const verifyOtpAndLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/verify-login', {
        email,
        otp
      });

      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        // Login Form
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {otp ? (
            <>
              <TextInput
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <Button
                title="Verify OTP & Login"
                onPress={verifyOtpAndLogin}
              />
            </>
          ) : (
            <Button
              title="Send OTP"
              onPress={handleLogin}
            />
          )}
          <Button
            title="Go to Register"
            onPress={toggleForm}
          />
        </>
      ) : (
        // Registration Form
        <>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          {otp ? (
            <>
              <TextInput
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <Button
                title="Verify OTP & Register"
                onPress={verifyOtpAndRegister}
              />
            </>
          ) : (
            <Button
              title="Send OTP"
              onPress={handleRegister}
            />
          )}
          <Button
            title="Go to Login"
            onPress={toggleForm}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    Main:{
        backgroundColor:'#213966',
        flex:1,
        justifyContent: 'center',
    alignItems: 'center',

    },
text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign:'center',
    color:'#fff',
    marginTop: 8, 
    
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width:"50%",
   alignItems:'center',
   marginBottom:128,
  },
  buttonText: {
    color: '#fff', // White text
    textAlign: 'center',
    fontSize: 16,
  },
  icon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignContent:'center',
   marginTop:10,
   
  },
});
export default Main
