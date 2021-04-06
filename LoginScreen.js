import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


function LoginScreen({navigation}){
    const[email, setEmail] = useState('');
    const[psswd, setPsswd] = useState('');
    // const[confirm, setConfirm] = useState('');
    const emailHandler = (val) => {
        setEmail(val);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
    }

    // const confirmHandler = (val) => {
    //     if (val === psswd) {
    //         // console.log(psswd);
    //         setConfirm(true);
    //         console.log(confirm);
    //         return true;
    //     } else {
    //         // console.log('val');
    //         // alert('Passwords need to match');
    //         return false;
    //     }
    // }

    const loginHandler = () => {
      console.log('email: ' + email + ' password: ' + psswd);
      navigation.navigate('GeneralScreen');
    }

    
    // render(){
    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'emailAddress'
                selectionColor = 'white'
                autoCapitalize = "none"
                onChangeText = {emailHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'password'
                selectionColor = 'white'
                secureTextEntry={true}
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
            />

            <TouchableOpacity
                // style = {styles.submitButton}
                onPress = {
                    loginHandler
                }>
                <LinearGradient
                    colors={['#f05454','#FF1D1D']}
                    style={styles.buttonStyle}    
                >
                  <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
        </View>
    )
    // }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222831',
        flex: 1,
        // paddingTop: 23,
        alignContent: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 15,
        height: 50,
        color: 'white',
        // borderColor: '#7a42f4',
        // placeholderTextColor: '#C22F00',
        borderColor: '#f05454',
        borderWidth: 1
    },
    submitButton: {
        // backgroundColor: '#5C29F0',
        backgroundColor: '#f05454',
        padding: 10,
        margin: 15,
        marginTop: 25,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
    },
    buttonStyle: {
      // flex: 1,
      // flexDirection: 'column',
      // backgroundColor: '#f05454',
      borderWidth: 1,
      // color: '#9dbeb7',
      borderColor: '#FF3E00',
      height: 60,
      // width: 140,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 40,
      marginBottom: 15,
  },
})