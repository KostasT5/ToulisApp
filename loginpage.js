import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'


// class LoginScreen extends Component {
//     state = {
//         email: '',
//         password: ''
//     }

//     handleEmail = (text) => {
//         this.setState({ email: text })
//     }
//     handlePassword = (text) => {
//         this.setState({ password: text })
//     }
//     login = (email, pass) => {
//         console.log('email: ' + email + ' password: ' + pass);

//     }

    
//     render(){
//         return (
//             <View style = {styles.container}>
//                 <TextInput style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "Email"
//                     placeholderTextColor = "#9a73ef"
//                     autoCapitalize = "none"
//                     onChangeText = {this.handleEmail}/>

//                 <TextInput style = {styles.input}
//                     underlineColorAndroid = "transparent"
//                     placeholder = "Password"
//                     placeholderTextColor = "#9a73ef"
//                     autoCapitalize = "none"
//                     onChangeText = {this.handlePassword}/>

//                 <TouchableOpacity
//                     style = {styles.submitButton}
//                     onPress = {
//                         () => this.login(this.state.email, this.state.password)
//                     }>
//                     <Text style = {styles.submitButtonText}> Submit </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

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

export default LoginScreen

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