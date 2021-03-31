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
            // alert('Passwords need to match');
            return false;
        }
    }

    const registerHandler = () => {
        if (confirm) {
            console.log('email: ' + email + ' password: ' + psswd);
        } else {
            alert('Passwords need to match');
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
                onEndEditing = {confirmHandler}
            />

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    registerHandler
                }>
                <Text style = {styles.buttonText}> Submit </Text>
            </TouchableOpacity>
        </View>
    )
    // }
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222831',
        flex: 1,
        // paddingTop: -10,
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
    
})