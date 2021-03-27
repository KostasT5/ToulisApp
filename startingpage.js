import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'




function ChooseScreen() {
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

function LoginScreen(){
    const[email, setEmail] = useState('');
    const[psswd, setPsswd] = useState('');
    
    const emailHandler = (val) => {
        setEmail(val);
    }

    const psswdHandler = (val) => {
        setPsswd(val);
    }

    const loginHandler = () => {
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
                placeholder = "Password"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {psswdHandler}
            />

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                    loginHandler
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
    )
    // }
}

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
                <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
        </View>
    )
    // }
}


class StartingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedPage: 'Start'}
    }

    renderCaseView = (param) => {
        switch(param) {
            case 'Start':
                return <ChooseScreen />;
                break;
            case 'Login':
                return <LoginScreen />;
                break;
            case 'Register':
                return <RegisterScreen />
                break;
            
        }
    }

    handleLogin = () => {
        // console.log("Login");
        return <LoginScreen />;
        // navigation.push('LoginScreen');
    }
    
    render() {
        // var loginToken = False;
        return(
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //     <Text>Settings!</Text>
                   
            //     <TouchableOpacity
            //         style = {styles.loginBttn}
            //         onPress = {this.handleLogin
            //             // () => console.log("button")
            //         }>
            //         <Text 
            //             style = {styles.loginText}
            //         >Login</Text>
            //     </TouchableOpacity>
            //     <Text>or</Text>
            //     <TouchableOpacity
            //         style = {styles.loginBttn}
            //         onPress = {
            //             () => console.log("registerbutton")
            //         }>
            //         <Text 
            //             style = {styles.loginText}
            //         >Register</Text>
            //     </TouchableOpacity>
            // </View>
            
            // <LoginScreen />
            <RegisterScreen />
        );
    }   
}


export default StartingScreen

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
});