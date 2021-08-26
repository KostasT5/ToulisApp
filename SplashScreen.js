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
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
import * as Animatable from 'react-native-animatable'
// import LoginScreen from './LoginScreen.js'

const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={styles.logo}>Logo</Text>
                 */}
                <Animatable.Image
                    animation='bounceIn'
                    duraton={2000}
                    source={require('./img/logo1.png')}
                    style={styles.logo}
                />
                
            </View>
            <Animatable.View 
                style={styles.footer}
                animation='fadeInUp'
                delay={200}
            >
                <Text style={styles.title}>Login or Create an Account</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        // style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {navigation.navigate('LoginScreen')}}> 
                        <LinearGradient
                            colors={['#f05454','#FF1D1D']}
                            style={styles.buttonStyle}    
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </LinearGradient>
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        // style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {navigation.navigate('RegisterScreen')}}>
                        <LinearGradient
                            colors={['#f05454','#FF1D1D']}
                            style={styles.buttonStyle}    
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                
            </Animatable.View>
            
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
        // backgroundColor: '#dddddd'
        
        backgroundColor: '#F8F8FF'
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F8FF'
    },
    logo: {
        width: 0.35*height,
        height: 0.35*height,
        // flex: 0.75,
    },
    innerText: {
        color: '#ffffff',
        flex: 1
    },
    footer: {
        flex: 1,
        // flexWrap: 'wrap',
        borderWidth: 1,
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        // justifyContent: 'space-between',
        backgroundColor: '#1C1E31',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    buttonContainer:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1C1E31',
        marginTop: 40,
        marginLeft: -20,
        marginRight: -20,
    },
    buttonStyle: {
        // flex: 1,
        // flexDirection: 'column',
        // backgroundColor: '#f05454',
        borderWidth: 1,
        // color: '#9dbeb7',
        borderColor: '#FF3E00',
        height: 60,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 15,
    },
    title: {
        fontSize: 25,
        color: '#ffffff',
        // marginBottom: 30,
        marginTop: 0
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
    },
});

