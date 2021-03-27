// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, Component} from 'react';
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

// import LoginScreen from './LoginScreen.js'

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Logo</Text>
                
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Discover Your City</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {navigation.navigate('LoginScreen')}}>
                        <Text style={styles.innerText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {navigation.navigate('RegisterScreen')}}>
                        <Text style={styles.innerText}>Register</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
        </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#C34E01'
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C34E01'
    },
    logo: {
        width: 0.25*height,
        height: 0.25*height,
    },
    innerText: {
        color: '#1c1c1c'
    },
    footer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        backgroundColor: '#1c1c1c',
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    buttonContainer:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        backgroundColor: '#1c1c1c',
    },
    buttonStyle: {
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        color: '#FF3E00',
        borderColor: '#FF3E00',
        height: 70,
        width: 100,
        alignItems: 'center',
        borderRadius: 50,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    title: {
        fontSize: 25,
        color: '#ffffff',
        // marginBottom: 30,
        marginTop: -30
    },
});

