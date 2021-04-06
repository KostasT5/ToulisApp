import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

function LoginRegisterScreen() {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
               
            <TouchableOpacity
                style = {styles.loginBttn}
                onPress = {
                    () => console.log("button")
                }>
                <Text 
                    style = {styles.loginText}
                >Login</Text>
            </TouchableOpacity>
            <Text>or</Text>
            <TouchableOpacity
                style = {styles.loginBttn}
                onPress = {
                    () => console.log("registerbutton")
                }>
                <Text 
                    style = {styles.loginText}
                >Register</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginRegisterScreen

const styles = StyleSheet.create({
    loginText: {
        color:'#C22F00'
    },
    registerButton: {

    },
    container: {
        backgroundColor: '#1C1C1C',
        flex: 1,
        paddingTop: 23
    },
});