import React, {useState, useEffect, Component} from 'react';
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

function UserScreen({navigation}) {
    const logoutHandler = () => {
        navigation.navigate('SplashScreen');
    }

    return (
        <View style={ styles.container }>
            <Text>User!</Text>
            <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        logoutHandler
                    }>
                    <Text style = {styles.buttonText}> Logout </Text>
            </TouchableOpacity>
        </View>
    );
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222831',
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
    
})