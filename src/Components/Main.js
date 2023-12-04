import React, { useState, useCallback,useEffect,useContext } from 'react';
import { View, StyleSheet, Button, Alert, Image, TextInput, ActivityIndicator, Text,TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as MediaLibrary from 'expo-media-library';
import { AuthContext } from './AuthContext';
const Main = () => {
  const navigation = useNavigation();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // State variables
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // New state to track if OTP is sent
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('We need notification permissions to make this work!');
      }
    };
  
    requestNotificationPermission();
  }, []);
  
useEffect(() => {
  const requestMediaLibraryPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('We need camera roll permissions to make this work!');
    }
  };

  requestMediaLibraryPermissions();
}, []);
  // Function to reset state
  const resetState = () => {
    setIsLogin(true);
    setEmail('');
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setLoading(false);
  };

  // Reset state when the screen is focused
  useFocusEffect(
    useCallback(() => {
      resetState();
    }, [])
  );
  // Toggle between login and registration forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false); // Reset otpSent when toggling forms
  };

  // Function to store JWT token in AsyncStorage
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (e) {
      console.error('Error saving token', e);
    }
  };
  // Send OTP to email
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (token && isLoggedIn === 'true') {
          // Navigate to Home if token exists and user is marked as logged in
          navigation.navigate('Home');
        } else {
          // Stay on the Main page
          navigation.navigate('Main');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);
  
  // Check token on app start
  // On app start
  
  
  const sendOtp = async () => {
    setLoading(true); // Start loading
    try {
      if (isLogin) {
        await axios.post('https://aces-hackathon.onrender.com/api/login', { email });
      } else {
        await axios.post('https://aces-hackathon.onrender.com/api/registeruser', { name, email, phone });
      }
      Alert.alert('OTP sent to your email');
      setOtpSent(true); // Update otpSent state to true when OTP is sent
    } catch (err) {
      console.error(err);
      Alert.alert('Error sending OTP');
    } finally {
      setLoading(false); // Stop loading
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
      const response = await axios.post('https://aces-hackathon.onrender.com/api/verify-register', {
        email,
        otp
      });
      console.log(response,'this is response')
      // Store the token
      await storeToken(response.data.token);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('isLoggedIn', 'true');
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
      const response = await axios.post('https://aces-hackathon.onrender.com/api/verify-login', {
        email,
        otp
      });
      // console.log(response.data.token,'this is response for otp verification')

      // Store the token
      await storeToken(response.data.token);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      Alert.alert('Login successful');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
      Alert.alert('Login failed');
    }
  };

  const LoadingOverlay = () => (
  <View style={styles.loadingOverlay}>
    <View style={styles.loadingBox}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Please wait...</Text>
    </View>
  </View>
);


  return (
    <View style={styles.container}>
    {loading && <LoadingOverlay />}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/b.png')} style={styles.logo} />
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#213966' }]} 
                  onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
                <View style={styles.spacing} />
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#213966' }]} 
                  onPress={toggleForm}
                >
                  <Text style={styles.buttonText}>Go to Register</Text>
                </TouchableOpacity>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#213966' }]} 
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
                <View style={styles.spacing} />
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#213966' }]} 
                  onPress={toggleForm}
                >
                  <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
              </View>

            )}
          </>
        )}
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
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
    width: 250,
    height: 250,
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
    borderRadius: 35,
    width: '50%', // Full width within the formContainer
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:-6,
    
  },
  buttonText: {
    color: '#fff',
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
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    zIndex: 1000, // Ensure it's above all other content
  },
  loadingBox: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 20,
    color: '#000',
  },
});
export default Main
