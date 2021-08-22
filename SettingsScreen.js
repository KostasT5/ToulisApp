import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons'


function SettingsScreen({navigation}) {

    const logoutHandler = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'SplashScreen'}],
        });
    }

    return(
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>Settings!</Text>
                */}
            <TouchableOpacity
                // style = {styles.loginBttn}
                onPress = {
                    logoutHandler
                }>
                <Icon 
                    name='log-out-outline'
                    size={40}
                    color='white'    
                />
                <Text 
                    style = {styles.buttonText}
                >Sign Out</Text>
            </TouchableOpacity>
        </View>
        </View>
        
    );
    
    
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1E31',
        flex: 1,
        paddingTop: 23
    },
    loginBttn: {
        // color:'white',
        backgroundColor:'white'
    },
    loginText: {
        color:'blue'
    },
    registerButton: {

    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
    },
});