import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
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
      Alert.alert('Please enter your correct email');
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
    <View style={styles.logoContainer}>
      <Image source={require('/Images/b.png')} style={styles.logo} />
    </View>

    <View style={styles.formContainer}>
      {isLogin ? (
        // Login Form
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {otpSent ? (
            // OTP Input for Login
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
                color="#213966"
              />
            </>
          ) : (
            // Button Container for Login
            <View style={styles.buttonContainer}>
              <Button
                title="Send OTP"
                onPress={handleLogin}
                color="#213966" // Primary button color
              />
              <View style={styles.spacing} /> {/* Spacer between buttons */}
              <Button
                title="Go to Register"
                onPress={toggleForm}
                color="#213966" // Secondary button color
              />
            </View>
          )}
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
          {otpSent ? (
            // OTP Input for Registration
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
                color="#213966"
              />
            </>
          ) : (
            // Button Container for Registration
            <View style={styles.buttonContainer}>
              <Button
                title="Send OTP"
                onPress={handleRegister}
                color="#213966" // Primary button color
              />
              <View style={styles.spacing} /> {/* Spacer between buttons */}
              <Button
                title="Go to Login"
                onPress={toggleForm}
                color="#213966" // Secondary button color
              />
            </View>
          )}
        </>
      )}
    </View>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#213966',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Change background color of the form
    padding: 20, // Add some padding inside the form
    borderRadius: 10, // Rounded corners for the form
    borderWidth: 1, // Border width
    borderColor: '#3498db', // Border color
    marginBottom: 20, // Space at the bottom
  },
  input: {
    width: '100%', // Full width within the formContainer
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '100%', // Full width within the formContainer
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  spacing: {
    width: 10, // Adjust as needed
  },
  primaryButton: {
    backgroundColor: '#28a745', // Primary button color (example: green)
  },
  secondaryButton: {
    backgroundColor: '#17a2b8', // Secondary button color (example: blue)
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
