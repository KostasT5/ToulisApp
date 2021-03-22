import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

function RegisterScreen(){
    const[email, setEmail] = useState('');
    const[psswd, setPsswd] = useState('');
    const[confirm, setConfirm] = useState('');
    const emailHandler = (val) => {
        setEmail(val);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
    }

    const confirmHandler = (val) => {
        if (val === psswd) {
            // console.log(psswd);
            setConfirm(true);
            console.log(confirm);
            return true;
        } else {
            // console.log('val');
            return false;
        }
    }

    const registerHandler = () => {
        if (confirm) {
            console.log('email: ' + email + ' password: ' + psswd);
        }
        
        // setEmail(val)
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
                placeholder = "Username"
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                selectionColor = 'white'
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
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

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Confirm Password"
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'password'
                selectionColor = 'white'
                secureTextEntry={true}
                autoCapitalize = "none"
                onChangeText = {confirmHandler}
            />

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    registerHandler
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
    )
    // }
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1C',
        flex: 1,
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 50,
        color: 'white',
        // borderColor: '#7a42f4',
        // placeholderTextColor: '#C22F00',
        borderColor: '#C22F00',
        borderWidth: 1
    },
    submitButton: {
        // backgroundColor: '#5C29F0',
        backgroundColor: '#C22F00',
        padding: 10,
        margin: 15,
        marginTop: 25,
        height: 50,
        // alignContent: 'center',
        // justifyContent: 'center'
    },
    submitButtonText:{
        color: 'white',
        // flex: 2
        
    }
    
})