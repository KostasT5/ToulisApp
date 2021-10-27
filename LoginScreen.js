import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const navigation = useNavigation();

function LoginScreen({navigation}){
    const[user, setUser] = useState('');
    const[psswd, setPsswd] = useState('');
    
    const userHandler = (val) => {
        setUser(val);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
    }

    const storeData = async () => {
        try {
            console.log(user);
            await AsyncStorage.setItem('user_name', user);
        } catch (e) {
            console.log(e);
        }
    }

    const loginHandler = () => {
        // console.log('user: ' + user + ' password: ' + psswd);
    //   BASE = 'http://127.0.0.1:5000/'
        // console.log('loginHanlder');
        console.log("Login");
        fetch('https://toulis-thesis.herokuapp.com/login', {//'http://10.0.2.2:5000/login', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // AcceptLanguage: '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: user,
                password: psswd
            })
        })          
        .then((response) => 
            response.json())
        .then((response) => {
           if (response['result']==202){
                storeData();
                console.log(AsyncStorage.getItem('user_name'));
                navigation.reset({
                    index: 0,
                    routes: [{name: 'GeneralScreen', params: {user: user}}],
                });
           } else {
               alert('Wrong Username or Password');
           }
        })
            // console.log(response))               
        .catch((error) => console.log(error));
        

        
      
    }

    
    // render(){
    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "User Name"
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'emailAddress'
                selectionColor = 'white'
                autoCapitalize = "none"
                onChangeText = {userHandler}
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
        backgroundColor: '#1C1E31',
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
      
      borderWidth: 1,
      
      borderColor: '#FF3E00',
      height: 60,
      
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 40,
      marginBottom: 15,
  },
})