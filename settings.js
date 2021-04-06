import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';


function SettingsScreen() {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>Settings!</Text>
                */}
            <TouchableOpacity
                // style = {styles.loginBttn}
                onPress = {
                    () => console.log("button")
                }>
                <Text 
                    // style = {styles.loginText}
                >Login</Text>
            </TouchableOpacity>
        </View>
    );
    
    
}

export default SettingsScreen();

const styles = StyleSheet.create({
    loginBttn: {
        // color:'white',
        backgroundColor:'white'
    },
    loginText: {
        color:'blue'
    },
    registerButton: {

    }
});