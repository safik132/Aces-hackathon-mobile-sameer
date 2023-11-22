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
  const [otpSent, setOtpSent] = useState(false); // New state to track if OTP is sent

  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false); // Reset otpSent when toggling forms
  };

  // Send OTP to email
  const sendOtp = async () => {
    try {
      if (isLogin) {
        await axios.post('http://localhost:5000/api/login', { email });
      } else {
        await axios.post('http://localhost:5000/api/registeruser', { name, email, phone });
      }
      Alert.alert('OTP sent to your email');
      setOtpSent(true); // Update otpSent state to true when OTP is sent
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

    await sendOtp();
  };

  // Verify OTP for registration
  const verifyOtpAndRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/verify-register', {
        email,
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
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }

    await sendOtp();
  };

  // Verify OTP for login
  const verifyOtpAndLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/verify-login', {
        email,
        otp
      });

      Alert.alert('Login successful');
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
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {otpSent ? ( // Use otpSent to determine whether to show OTP input
            <>
              <TextInput
                style={styles.input}
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
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
          />
          {otpSent ? ( // Use otpSent for registration form as well
            <>
              <TextInput
                style={styles.input}
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
  container: {
    backgroundColor: '#213966',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 8, 
},
input: {
    width: '80%', // Match the width with the buttons
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd', // Light grey border
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // White background for inputs
    color: '#000', // Black text for readability
},
button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '80%', // Match the width with the inputs
    alignItems: 'center',
    marginBottom: 12,
},
buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
},
icon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignContent: 'center',
    marginTop: 10,
},
});
export default Main
