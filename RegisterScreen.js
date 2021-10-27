import React, { Component, useState, setState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({navigation}){

    const[email, setEmail] = useState('');
    const[user, setUser] = useState('');
    const[psswd, setPsswd] = useState('');
    const[confirm, setConfirm] = useState('');

    const storeData = async () => {
        try {
            console.log(user);
            await AsyncStorage.setItem('user_name', user);
        } catch (e) {
            console.log(e);
        }
    }

    const emailHandler = (val) => {
        // console.log(val);
        setEmail(val);
        // console.log(email);
    }

    const userHandler = (val) => {
        setUser(val);
        // console.log(user);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
        // console.log(psswd);
    }

    const confirmHandler = (val) => {
        setConfirm(val);
    }

    const registerHandler = () => {
        console.log(email,user,psswd);
        if (psswd.length < 6) {
            alert('Password length must be at least 6 characters');
        }
        else {
            if (confirm === psswd && email != '' && user != '' && psswd != '') {
                // console.log('email: ' + email + ' password: ' + psswd);
                console.log('Registering user with credentials: ' + email + ' ' + user + ' ' + psswd);
                fetch('https://toulis-thesis.herokuapp.com/register', {
                    method: 'POST',
                    headers: {
                        // Accept: 'application/json',
                        // AcceptLanguage: '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        user_name: user,
                        password: psswd
                    })
                })          
                .then((response) => 
                    response.json())
                .then((response) => {
                    storeData();
                    console.log(AsyncStorage.getItem('user_name'));
                    if (response['result']==201){
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'GeneralScreen', params: {user: user}}],
                        });
                    } else {
                        alert(response['message']);
                    }
                })   
                .catch((error) => console.log(error));
            
            } else {
                console.log('DATA: ' + email + ' ' + user + ' ' + psswd);
                alert('Invalid Data');
            }

        }
    }
        

    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                // value = {email}
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'emailAddress'
                selectionColor = 'white'
                autoCapitalize = "none"
                // onEndEditing = {emailHandler}
                onChangeText = {emailHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                // value = {user}
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                selectionColor = 'white'
                autoCapitalize = "none"
                // onEndEditing = {userHandler}
                onChangeText = {userHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                // value = {psswd}
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'password'
                selectionColor = 'white'
                secureTextEntry={true}
                autoCapitalize = "none"
                // onEndEditing = {psswdHandler}
                onChangeText = {psswdHandler}
            />

            <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Confirm Password"
                // value = {confirm}
                // placeholderTextColor = "#9a73ef"
                placeholderTextColor= '#FF3E00'
                textContentType = 'password'
                selectionColor = 'white'
                secureTextEntry={true}
                autoCapitalize = "none"
                // onEndEditing = {confirmHandler}
                onChangeText = {confirmHandler}
            />

            <TouchableOpacity
                // style = {styles.submitButton}
                onPress = {
                    registerHandler
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
  
}



export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1E31',
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