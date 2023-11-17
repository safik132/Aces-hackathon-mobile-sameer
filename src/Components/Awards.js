import React from 'react'
import { View,Image,StyleSheet,Text } from 'react-native'
import FooterButtons from './FooterButtons';

function Awards() {
  return (
    <View style={styles.prize}>
     <Text style={styles.text}>Prizes for Hack Revolution</Text>
     <Text style={{ ...styles.text, color:'red',fontSize:20,marginBottom:10,  textDecorationLine: 'underline' }}>Cash Prizes Worth ₹ 3,00,000/-</Text>
     {/* 1st Prize */}
     <View style={styles.prizeItem}>
       <View style={styles.iconContainer}>
         <Image
           source={require('../../Images/1.png')}
           style={styles.icon}
         />
       </View>
       <View style={styles.textContainer}>
         <Text style={{ ...styles.text1, marginRight:20  }}>₹ 40,000</Text>
         <Text style={{ ...styles.text1, marginRight:20  }}>1st Prize</Text>
       </View>
     </View>
<View style={{ flexDirection: 'row' }}>
     {/* 2nd Prize */}
     <View style={styles.prizeItem}>
       <View style={styles.iconContainer}>
         <Image
           source={require('../../Images/2.png')}
           style={styles.icon}
         />
       </View>
       <View style={styles.textContainer}>
         <Text style={{ ...styles.text1, marginRight:20  }}>₹ 25,000</Text>
         <Text style={{ ...styles.text1, marginRight:20  }}>2nd Prize</Text>
       </View>
     </View>

     {/* 3nd Prize */}
     <View style={styles.prizeItem}>
       <View style={styles.iconContainer}>
         <Image
           source={require('../../Images/3.png')}
           style={styles.icon}
         />
       </View>
       <View style={styles.textContainer}>
         <Text style={{ ...styles.text1, marginRight:20  }}>₹ 10,000</Text>
         <Text style={{ ...styles.text1, marginRight:20  }}>3rd Prize</Text>
       </View>
     </View>
     </View>
     <Text style={styles.text3}>Prizes worth ₹ 75,000 in each track</Text>
     <FooterButtons/>
     </View>
  )
}

const styles = StyleSheet.create({
    prize: {
      flex:1,
      backgroundColor:'#F3F3F3',
   
       
        alignItems: 'center',

      },
      prizeItem: {
        // flexDirection: 'row', // Horizontal layout
        alignItems: 'center',
     
        marginRight:30
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        color:'#000',
        marginTop: 8, 
        
      },
      text1:{
        fontSize: 16,
        marginTop: 8, 
        color:'#000',
        
      },
      text3:{
      
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        color:'#E50035',
        marginTop: 18,
        marginBottom:235, 
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
        width: 80, // Adjust the size of the container as needed
        height: 80, // Adjust the size of the container as needed
        borderColor:'#000',
        borderWidth:1,
        borderRadius: 45, // Set half of the width or height to create a circular shape
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Padding for the circular container
      },
});

export default Awards
