import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

function RegisterScreen(){
    const[email, setEmail] = useState('');
    const[psswd, setPsswd] = useState('');
    
    const emailHandler = (val) => {
        setEmail(val);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
    }

    const registerHandler = () => {
        console.log('email: ' + email + ' password: ' + psswd);
        // setEmail(val)
    }

    
    // render(){
    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {emailHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Confirm Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
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
        // backgroundColor: 'black',
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#5C29F0',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    }
    
})