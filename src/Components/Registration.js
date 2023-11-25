import React, { useState, useEffect  } from 'react';
import {TouchableOpacity, Platform } from 'react-native';
import {Alert, ScrollView, View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


export default function Register() {
    // State for each form field
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState('2');
    const [teamLeaderName, setTeamLeaderName] = useState('');
    const [college, setCollege] = useState('');
    const [branch, setBranch] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    // State for team member 1
    const [teamMember1Name, setTeamMember1Name] = useState('');
    const [teamMember1RollNo, setTeamMember1RollNo] = useState('');
    const [teamMember1Gender, setTeamMember1Gender] = useState('M');

    // State for team member 2
    const [teamMember2Name, setTeamMember2Name] = useState('');
    const [teamMember2RollNo, setTeamMember2RollNo] = useState('');
    const [teamMember2Gender, setTeamMember2Gender] = useState('M');

    const [teamMember3Name, setTeamMember3Name] = useState('');
    const [teamMember3RollNo, setTeamMember3RollNo] = useState('');
    const [teamMember3Gender, setTeamMember3Gender] = useState('M');

    const [teamMember4Name, setTeamMember4Name] = useState('');
    const [teamMember4RollNo, setTeamMember4RollNo] = useState('');
    const [teamMember4Gender, setTeamMember4Gender] = useState('M');

    const [teamMember5Name, setTeamMember5Name] = useState('');
    const [teamMember5RollNo, setTeamMember5RollNo] = useState('');
    const [teamMember5Gender, setTeamMember5Gender] = useState('M');

    const [track, setTrack] = useState('Generic Software');
    const [selectedFile, setSelectedFile] = useState({});

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    const handleDeleteFile = () => {
        setSelectedFile({});
    };
    const LoadingOverlay = () => (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        </View>
      );
      
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View>
                         <Text style={styles.label}>
                            Team Name:<Text style={styles.asterisk}>*</Text>
                        </Text>
                        <TextInput style={styles.input} value={teamName} onChangeText={setTeamName} />

                        <Text style={styles.label}>Team Leader Name:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput style={styles.input} value={teamLeaderName} onChangeText={setTeamLeaderName} />

                        <Text style={styles.label}>College:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput style={styles.input} value={college} onChangeText={setCollege} />

                        <Text style={styles.label}>Branch:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput style={styles.input} value={branch} onChangeText={setBranch} />

                        <Text style={styles.label}>Roll Number:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput style={styles.input} value={rollNumber} onChangeText={setRollNumber} />

                        <Text style={styles.label}>Email:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                        <Text style={styles.label}>Mobile Number:<Text style={styles.asterisk}>*</Text></Text>
                        <TextInput 
                            style={styles.input} 
                            value={mobileNumber} 
                            onChangeText={setMobileNumber} 
                            keyboardType="numeric" // This ensures only the numeric keyboard is shown
                        />
                    </View>
                );
            case 2:
                return (
                    <><View>
                        <Text style={styles.label}>Team Member 1 Name:</Text>
                        <TextInput style={styles.input} value={teamMember1Name} onChangeText={setTeamMember1Name} />
                        <Text style={styles.label}>Team Member 1 Roll Number:</Text>
                        <TextInput style={styles.input} value={teamMember1RollNo} onChangeText={setTeamMember1RollNo} />
                        <Text style={styles.label}>Team Member 1 Gender:</Text>
                        <Picker
                            selectedValue={teamMember1Gender}
                            onValueChange={setTeamMember1Gender}
                            style={styles.picker}
                        >
                            <Picker.Item label="Male" value="M" />
                            <Picker.Item label="Female" value="F" />
                        </Picker>
                        </View><View>
                            <Text style={styles.label}>Team Member 2 Name:</Text>
                            <TextInput style={styles.input} value={teamMember2Name} onChangeText={setTeamMember2Name} />
                            <Text style={styles.label}>Team Member 2 Roll Number:</Text>
                            <TextInput style={styles.input} value={teamMember2RollNo} onChangeText={setTeamMember2RollNo} />
                            <Text style={styles.label}>Team Member 2 Gender:</Text>
                            <Picker
                                selectedValue={teamMember2Gender}
                                onValueChange={setTeamMember2Gender}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="M" />
                                <Picker.Item label="Female" value="F" />
                            </Picker>
                        </View><View>
                            <Text style={styles.label}>Team Member 3 Name:</Text>
                            <TextInput style={styles.input} value={teamMember3Name} onChangeText={setTeamMember3Name} />
                            <Text style={styles.label}>Team Member 3 Roll Number:</Text>
                            <TextInput style={styles.input} value={teamMember3RollNo} onChangeText={setTeamMember3RollNo} />
                            <Text style={styles.label}>Team Member 3 Gender:</Text>
                            <Picker
                                selectedValue={teamMember3Gender}
                                onValueChange={setTeamMember3Gender}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="M" />
                                <Picker.Item label="Female" value="F" />
                            </Picker>
                        </View><View>
                            <Text style={styles.label}>Team Member 4 Name:</Text>
                            <TextInput style={styles.input} value={teamMember4Name} onChangeText={setTeamMember4Name} />
                            <Text style={styles.label}>Team Member 4 Roll Number:</Text>
                            <TextInput style={styles.input} value={teamMember4RollNo} onChangeText={setTeamMember4RollNo} />
                            <Text style={styles.label}>Team Member 4 Gender:</Text>
                            <Picker
                                selectedValue={teamMember4Gender}
                                onValueChange={setTeamMember4Gender}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="M" />
                                <Picker.Item label="Female" value="F" />
                            </Picker>
                        </View><View>
                            <Text style={styles.label}>Team Member 5 Name:</Text>
                            <TextInput style={styles.input} value={teamMember5Name} onChangeText={setTeamMember5Name} />
                            <Text style={styles.label}>Team Member 5 Roll Number:</Text>
                            <TextInput style={styles.input} value={teamMember5RollNo} onChangeText={setTeamMember5RollNo} />
                            <Text style={styles.label}>Team Member 5 Gender:</Text>
                            <Picker
                                selectedValue={teamMember5Gender}
                                onValueChange={setTeamMember5Gender}
                                style={styles.picker}
                            >   
                                <Picker.Item label="Male" value="M" />
                                <Picker.Item label="Female" value="F" />
                            </Picker>
                        </View></>
                );
            case 3:
                return (
                    <View>
                    <Text style={styles.label}>Tracks:<Text style={styles.asterisk}>*</Text></Text>
                  <Picker
                        selectedValue={track}
                        onValueChange={setTrack}
                        style={styles.picker}
                    >
                        <Picker.Item label="Generic Software" value="Generic Software" />
                        <Picker.Item label="Generic Hardware" value="Generic Hardware" />
                        <Picker.Item label="Health Care" value="Health Care" />
                        <Picker.Item label="Fin-tech" value="Fin-tech" />
                    </Picker>
                    <Text style={styles.label}>File:<Text style={styles.asterisk}>*</Text></Text>
            
                    <View style={styles.uploadButtonContainer}>
                        <Button title="Upload File" onPress={handleSelectFile} />
                    </View>

                    {selectedFile.name && (
                        <View style={styles.fileInfoContainer}>
                            <Text>Uploaded File: {selectedFile.name}</Text>
                            <Button title="Delete File" onPress={handleDeleteFile} color="red" />
                        </View>
                    )}
            
                </View>
                );
            default:
                return null;
        }
    };


    

    const handleSelectFile = async () => {
        
        try {
    
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
            console.log(result.assets[0],'this is in result')
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
            Alert.alert("Registration Failed", "An error occurred during registration.");
        } 
    };
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const validateMobileNumber = (number) => {
        return number.length === 10 && /^\d+$/.test(number);
    };
    
    const handleSubmit = async () => {
         // Check for empty fields
        if (!teamName || !teamLeaderName || !college || !branch || !rollNumber || !email || !mobileNumber || !track || !selectedFile) {
            console.log('Form values:', { teamName, teamLeaderName, college, branch, rollNumber, email, mobileNumber, track, selectedFile });
            alert('Please fill in all fields. Check if there are empty or invalid fields.');
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

        // Appending text-based form data
        formData.append('teamName', teamName);
        formData.append('teamMembers', teamMembers);
        formData.append('teamLeaderName', teamLeaderName);
        formData.append('college', college);
        formData.append('branch', branch);
        formData.append('rollNumber', rollNumber);
        formData.append('email', email);
        formData.append('mobileNumber', mobileNumber);
        formData.append('track', track);
        formData.append('team_member_1', teamMember1Name);
        formData.append('team_member_1_roll_no', teamMember1RollNo);
        formData.append('team_member_1_gender', teamMember1Gender);
        formData.append('team_member_2', teamMember2Name);
        formData.append('team_member_2_roll_no', teamMember2RollNo);
        formData.append('team_member_2_gender', teamMember2Gender);
        formData.append('team_member_3', teamMember3Name);
        formData.append('team_member_3_roll_no', teamMember3RollNo);
        formData.append('team_member_3_gender', teamMember3Gender);
        formData.append('team_member_4', teamMember4Name);
        formData.append('team_member_4_roll_no', teamMember4RollNo);
        formData.append('team_member_4_gender', teamMember4Gender);
        formData.append('team_member_5', teamMember5Name);
        formData.append('team_member_5_roll_no', teamMember5RollNo);
        formData.append('team_member_5_gender', teamMember5Gender);
        if (selectedFile) {
            
                formData.append('file', selectedFile);

        }

        try {
            const response = await axios.post("https://aces-hackathon.onrender.com/api/register", formData, {
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
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
    
        } catch (error) {

            console.error('Error submitting form:', error);
            Alert.alert("Registration Failed", "An error occurred during registration.");
        }
        finally{
            setIsLoading(false);
        }

        console.log('Team Name:', teamName);
        console.log('Team Leader Name:', teamLeaderName);
        console.log('college', college);
        console.log(' branch',  branch);
        console.log('rollNumber', rollNumber);
        console.log('email', email);
        console.log('mobileNumber', mobileNumber);
        console.log(' track',  track);
       
        console.log('Selected File:', selectedFile);
        

    };

    return (
        <ScrollView style={styles.container}>
        {isLoading && <LoadingOverlay />}
        <Text style={styles.title}>Hack Revolution Registration</Text>
        <Text style={styles.infoText}>[Hackathon Info Here]</Text>

        {renderStep()}

        <View style={styles.navigationButtons}>
            {currentStep > 1 && <TouchableOpacity style={[styles.button, styles.backButton]} onPress={prevStep}>
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>}
            {currentStep < totalSteps &&  <TouchableOpacity style={styles.button} onPress={nextStep}>
                                                <Text style={styles.buttonText}>Next</Text>
                                            </TouchableOpacity>}
            {currentStep === totalSteps && <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                                <Text style={styles.buttonText}>Submit</Text>
                                            </TouchableOpacity>}
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8', // Lighter background
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#213966',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoText: {
        color: '#213966',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#213966',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10, // Rounded corners
        borderWidth: 1,
        borderColor: '#c4c4c4', // Subtle border
        fontSize: 16,
    },
    picker: {
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderRadius: 10, // Rounded corners
        borderWidth: 1,
        borderColor: '#c4c4c4', // Subtle border
    },
    uploadButtonContainer: {
        marginBottom: 15,
        alignItems: 'center',
    },
    fileName: {
        marginTop: 5,
        fontSize: 16,
        color: 'gray',
    },
    button: {
        backgroundColor: '#213966',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
        marginBottom:6
    },
    backButton: {
        backgroundColor: '#213966', // Or any other color for the back button
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    asterisk: {
        color: 'red',
    },
    fileInfoContainer: {
        marginVertical: 10,
        alignItems: 'center',
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
        zIndex: 1000, // Ensure it's on top of all other content
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
});