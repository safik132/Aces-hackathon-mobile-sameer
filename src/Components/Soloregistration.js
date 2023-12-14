// SoloRegister.js
import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

export default function SoloRegister() {
    const navigation = useNavigation();
    const [registrationType, setRegistrationType] = useState('solo');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [gender, setGender] = useState('');
    const [college, setCollege] = useState('');
    const [branch, setBranch] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [teamName, setTeamName] = useState('');
    const [position, setPosition] = useState('');
    const [track, setTrack] = useState('');
    const [selectedFile, setSelectedFile] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateMobileNumber = (number) => {
        return number.length === 10 && /^\d+$/.test(number);
    };
    const LoadingOverlay = () => (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        </View>
      );
    const handleSelectFile = async () => {
        
        try {
    
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            console.log(result.assets[0],'this is in result')
            // Check if the file selection was cancelled
            if (result.type === 'cancel') {
                console.log('File selection was cancelled.');
                setCurrentStep(3); // Redirect back to step 3
                return; // Exit the function if no file was selected
            }
            if (result) {
                const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
                    console.log(fileInfo, 'this is file info')
                // Set the selected file state
                setSelectedFile({
                    uri: result.assets[0].uri,
                    type: result.assets[0].mimeType,
                    name: result.assets[0].name,
                    size: result.assets[0].size,
                });
                // setSelectedFileName(result.name);
                console.log(selectedFile, 'after file uplaod')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert("File selection Failed", "Please select a file");
        } 
    };
    const handleDeleteFile = () => {
        setSelectedFile({});
    };

    const handleSubmit = async () => {
        // Check for empty fields
       
       setIsLoading(true);
        if (!name || !rollNumber || !gender || !college || !branch || !email || !mobileNumber || !teamName || !position || !track) {
            Alert.alert('Error', 'Please fill in all fields');
            setIsLoading(false);
            return;
        }

       // Email validation
       if (!validateEmail(email)) {
           alert('Please enter a valid email address.');
           setIsLoading(false);
           return;
       }

       // Mobile number validation
       if (!validateMobileNumber(mobileNumber)) {
           alert('Mobile number must be exactly 10 digits.');
           setIsLoading(false);
           return;
       }
       const formData = new FormData();
       formData.append('name', name);
       formData.append('rollNumber', rollNumber);
       formData.append('gender', gender);
       formData.append('college', college);
       formData.append('branch', branch);
       formData.append('email', email);
       formData.append('mobileNumber', mobileNumber);
       formData.append('teamName', teamName);
       formData.append('position', position);
       formData.append('track', track);
       if (selectedFile) {
           
               formData.append('file', selectedFile);

       }

       try {
           const response = await axios.post("https://s-hub-backend-dev.onrender.com/api/solo-register", formData, {
               headers: {
                   'Content-Type': 'multipart/form-data',
               },
           });
   
           console.log(response.data); // Handle the response as needed
   
           // Display success alert
           Alert.alert(
               "Registration Successful",
               "Thank you for registering for Aces Hackathon. Happy Coding!",
               [
                   { text: "OK", onPress: () => navigation.navigate("Home") }
               ]
           );
   
       } catch (error) {

        console.error('Error submitting form:', error);
        Alert.alert("Registration Failed", `An error occurred: ${error.message}`);
       }
       finally{
           setIsLoading(false);
       }
       

   };
    const handleRegistrationTypeChange = (type) => {
        setRegistrationType(type);
        if (type === 'team') {
            navigation.navigate('Registration'); // Navigate to the team registration screen
        }
    };
    

    // Render radio buttons
    const renderRadioButtons = () => (
        <View style={styles.radioContainer}>
        
            <TouchableOpacity
                style={styles.radio}
                onPress={() => handleRegistrationTypeChange('team')}
            >
                <Text>Team Registration</Text>
                
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.radio1}
                onPress={() => handleRegistrationTypeChange('solo')}
            >
                <Text style={styles.buttonText}>Solo Registration</Text>
                
            </TouchableOpacity>
        </View>
    );

    return (
        
        <ScrollView style={styles.container}>
        {isLoading && <LoadingOverlay />}
        <Text style={styles.title}>Hack Revolution individual Registration</Text>
            {renderRadioButtons()}
            
            {/* Form fields */}
            <Text style={styles.label}>
               Name:<Text style={styles.asterisk}>*</Text>
           </Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <View>
            <Text style={styles.label}>
               Team Name:<Text style={styles.asterisk}>*</Text>
           </Text>
           <TextInput style={styles.input} placeholder="Team Name" value={teamName} onChangeText={setTeamName} />

          

           <Text style={styles.label}>Gender:<Text style={styles.asterisk}>*</Text></Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Male" value="M" />
                    <Picker.Item label="Female" value="F" />
                </Picker>

                <Text style={styles.label}>Position:<Text style={styles.asterisk}>*</Text></Text>
                <Picker
                    selectedValue={position}
                    onValueChange={(itemValue) => setPosition(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Team Leader" value="Team Leader" />
                    <Picker.Item label="Team Member" value="Team Member" />
                </Picker>
                <Text style={styles.label}>Tracks:<Text style={styles.asterisk}>*</Text></Text>
                <Picker
                    selectedValue={track}
                    onValueChange={(itemValue) => setTrack(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Generic Software" value="Generic Software" />
                    <Picker.Item label="Generic Hardware" value="Generic Hardware" />
                    <Picker.Item label="Health Care" value="Health Care" />
                    <Picker.Item label="Fin-tech" value="Fin-tech" />
                </Picker>
           <Text style={styles.label}>College:<Text style={styles.asterisk}>*</Text></Text>
           <TextInput style={styles.input} placeholder="College" value={college} onChangeText={setCollege} />

           <Text style={styles.label}>Branch:<Text style={styles.asterisk}>*</Text></Text>
           <TextInput style={styles.input} placeholder="Branch" value={branch} onChangeText={setBranch} />

           <Text style={styles.label}>Roll Number:<Text style={styles.asterisk}>*</Text></Text>
           <TextInput style={styles.input} placeholder="Roll Number"value={rollNumber} onChangeText={setRollNumber} />

           <Text style={styles.label}>Email:<Text style={styles.asterisk}>*</Text></Text>
           <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

           <Text style={styles.label}>Mobile Number:<Text style={styles.asterisk}>*</Text></Text>
           <TextInput 
               style={styles.input} 
               value={mobileNumber} 
               placeholder="Mobile Number"
               onChangeText={setMobileNumber} 
               keyboardType="numeric" // This ensures only the numeric keyboard is shown
           />
       </View>
            {/* ... add other input fields similarly */}
            <View>
    <View style={styles.uploadButtonContainer}>
        <TouchableOpacity title="Upload File" style={styles.button} onPress={handleSelectFile} >
        <Text style={styles.buttonText}>Upload file</Text>
        </TouchableOpacity>
    </View>

    {selectedFile.name && (
        <View style={styles.fileInfoContainer}>
            <Text>Uploaded File: {selectedFile.name}</Text>
            <TouchableOpacity title="Delete File" onPress={handleDeleteFile} color="red" >
            <Button title="Delete File" onPress={handleDeleteFile} color="red" />
            </TouchableOpacity>
        </View>
    )}
    

    <View style={styles.uploadButtonContainer1}>
        <TouchableOpacity style={styles.button} title="Submit" onPress={handleSubmit} >
        <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    </View>
</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Styles for your component, including radio buttons
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
        padding: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    picker: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        fontSize: 16,
    },
    loadingOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%', // Full width
        height: '100%', // Full height
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        zIndex: 1000, // Ensure it's on top of all other content
        flex: 1, // Add flex to ensure it fills the screen
    },
    loadingBox: {
        padding: 20,
        backgroundColor: '#fff', // White background for the box
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
        marginTop: 10,
        color: '#000', // Black text
        fontSize: 18, // Slightly larger font size
    },
    button: {
        backgroundColor: '#213966',
        width: '100%',
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
        marginBottom:5
    },
    
    backButton: {
        backgroundColor: '#213966', // Or any other color for the back button
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#213966',
        marginBottom: 15,
        textAlign: 'center',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    radio: {
        backgroundColor: '#f0f0f0', // Light grey background
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c0c0c0', // Subtle border color
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radio1: {
        backgroundColor: '#213966',
        tintColor:"#fff", // Light grey background
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c0c0c0', // Subtle border color
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor:"#213966",// Match your primary color or choose a distinct color
        marginLeft: 10,
    },
    uploadButtonContainer: {
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#213966', // Replace with your button color
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButtonContainer1: {
        marginBottom: 25,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#213966', // Replace with your button color
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileInfoContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        // Add your label styles here (if not already defined)
    },
    asterisk: {
        color: 'red',
    },
    // ... other styles
});
