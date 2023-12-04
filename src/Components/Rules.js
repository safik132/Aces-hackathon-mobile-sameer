
import React from 'react';
import { View, Text, StyleSheet, ScrollView ,BackHandler } from 'react-native';
import FooterButtons from './FooterButtons';
import { useFocusEffect ,useNavigation} from '@react-navigation/native';
function Rules() {
  const navigation = useNavigation();
  // Inside your Importantdates component
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true; // Prevents default back button behavior
        }
        // Default behavior (exit the app) if no screens in the stack
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  return (
    <View style={styles.main}>
    <ScrollView >
    <View style={styles.container}>
      <Text style={styles.text}>Rules & Regulations of Hack Revolution</Text>
      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline', }}>Team Specification:</Text>
      <Text style={styles.listItem}>• Each team should consist of 4-6 participants.</Text>
      <Text style={styles.listItem}>• Students can form teams from different branches and years.</Text>
      <Text style={styles.listItem}>• Teams from other colleges are allowed and encouraged to participate.</Text>
      <Text style={styles.listItem}>• The Hackathon will be on Sunday 17 December from 7.00 AM – 10.00 PM. Prizes will be announced immediately after the hackathon.</Text>
      <Text style={styles.listItem}>• All participant will have to make their own travel and accommodation arrangements.</Text>
      <Text style={styles.listItem}>• The organisers will provide Lunch, Tea and Snacks along with registration kits and goodies.</Text>

      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline', }}>Registration:</Text>
      <Text style={styles.listItem}>1. Teams can submit only one abstract.</Text>
      <Text style={styles.listItem}>2. A student can be part of only one team.</Text>
      <Text style={styles.listItem}>3. The teams must follow the PPT template provided for idea submission.</Text>
      <Text style={styles.listItem}>4. The registration window will be open from 11 th Nov 2023 to 25th Nov 2023.</Text>
      <Text style={styles.listItem}>5. The teams registering for hardware track should submit a block diagram and list of hardware components that they would like to use along with the abstract. (The organisers will provide 220 V AC power supply, the teams should organise for their own components or batteries as required.)</Text>

      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline', }}>Abstract Submission:</Text>
      <Text style={styles.listItem}>1. Abstracts should justify as to how the problem is being solved,cost effective solutions with a business model are encouraged.</Text>
      <Text style={styles.listItem}>2. Abstracts should not contain any form of code.</Text>
      <Text style={styles.listItem}>3. The ideas or solutions provided/developed/proposed by the team must be new and must not have been present in any previous event/program of any sort.</Text>
      <Text style={styles.listItem}>4. An algorithm/flow chart explaining the work flow of the project should be included along with the abstract.</Text>
      <Text style={styles.listItem}>5. The details of Software Tools/Languages/Environment being used should be given.</Text>
      
      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline', }}>Shortlisting of teams:</Text>
      <Text style={styles.listItem}>1. Post Idea submission process, the ideas will be evaluated by experts from Industry and Academia.</Text>
      <Text style={styles.listItem}>2. Evaluation criteria will include novelty of the idea, complexity, clarity and details in the prescribed format, feasibility, practicability, sustainability, scale of impact, user experience and potential for future work progression.</Text>
      <Text style={styles.listItem}>3. A Max of 15 teams will be shortlisted per track and 5 waitlisted.</Text>
     
      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline' }}>Final Registration:</Text>
      <Text style={styles.listItem}>1. Shortlisted teams will be informed through their registered emails between 6th to 9th December.</Text>
      <Text style={styles.listItem}>2. Team must register before 12th December.</Text>
      <Text style={styles.listItem}>3. Teams that fail to register will be disqualified.</Text>
      <Text style={styles.listItem}>4. College photo ID is mandatory for participating</Text>

      <Text style={{ ...styles.text1, fontSize: 22, fontWeight: 'bold', paddingLeft: 10, textDecorationLine: 'underline' }}>Other Details:</Text>
      <Text style={styles.listItem}>1. There will be three prizes per track. The first prize per track is Rs. 40,000/ - , Second Prize – Rs. 25,000/- and Third prize of Rs. 10,000/- . The prize amount will be Rs. 75,000 per track and as there are four tracks the total prize is Rs. 3 Lakhs.</Text>
      <Text style={styles.listItem}>2. The prize money will be transferred to the bank account of the team members by equally splitting the same among all members within 15 days of completion of event. The students should provide all bank details along with name, account number and IFSC code. Cash prizes will not be given.</Text>
      <Text style={styles.listItem}>3. If there is a tie between two or more teams, the final decision of the prize money distribution will be taken by the organisers only and once the decision is made, it won’t be changed further.</Text>
      <Text style={styles.listItem}>4. Projects that incorporate peripheral hardware that may need additional space (such as large robotic devices, drones, etc.) must be pre-approved by the organizers.</Text>
      <Text style={styles.listItem}>5. At least one team member must be physically present during sign-in.</Text>
      <Text style={styles.listItem}>6. One must be conscious and present the project to the judges during their assigned presentation time.</Text>
    </View>
    </ScrollView>
    <FooterButtons/>
    </View>
  );
}

const styles = StyleSheet.create({
main:{
  flex:1,
},
  container: {
    flexDirection: 'column', 
    padding: 10,
    backgroundColor:'#F3F3F3',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    color: '#000',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#213966',
    marginTop: 8,
  },
  text1: {
    fontSize: 22,
    marginTop: 8,
    color: '#213966',
  },
});



export default Rules;
