import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';
import {useNavigation} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RNRestart from 'react-native-restart';

import Icon from 'react-native-vector-icons/Ionicons'


function SettingsScreen(){

    // const navigation = useNavigation();

    const logoutHandler = () => {
    //     navigation.reset({
    //         index: 0,
    //         routes: [{name: 'SplashScreen'}],
    //     });
        // navigation.dispatch(
        //     StackActions.popToTop()
        // );
        console.log('restart');
        RNRestart.Restart();
    }

    // logoutHandler = () => {
    //     this.props.navigation.dispatch(
    //         StackActions.popToTop()
    //     );
    // }


    // render() {
    return(
        <View style={styles.container}>
            <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>Welcome to Places</Text>
            </View>
            
            <View style={styles.list}>
                <Text style={styles.title}>About</Text>
                <Text style={styles.item}>
                    Places is an app designed to help users navigate through sites of interest within a city.
                </Text>
                <Text style={styles.item}>
                    Head to the Map screen where recommendantions  are listed with user scores. 
                </Text>
                <Text style={styles.item}>
                    You can press the View on Map button to zoom in to a place's location.
                </Text>
                <Text style={styles.item}>
                    Once you arrive in the vicinity of the place, press the View on Map button to leave a comment and rating of the place for other users to see!

                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
                <TouchableOpacity              
                    onPress = {
                        logoutHandler
                    }
                >

                    <LinearGradient
                        colors={['#f05454','#FF1D1D']}
                        style={styles.buttonStyle}    
                    > 
                        <Icon 
                            name='log-out-outline'
                            size={40}
                            color='white'    
                        />
                    
                        <Text 
                            style = {styles.buttonText}
                        >
                            Sign Out
                        </Text>
                    </LinearGradient>
                    
                </TouchableOpacity>
            </View>
        </View>
        
    );
    // }

    
    
    
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
    title: {
        fontSize: 30,
        color: '#ffffff',
        // marginBottom: 30,
        marginTop: 0,
        paddingLeft: 10,
        paddingBottom: 10,
        // paddingTop: 20,
        
    },
    item :{
        fontSize: 19,
        color: '#ffffff',
        paddingBottom: 10,
        // paddingLeft: 15,
        // paddingTop: 10,
    },
    list: {
        flex: 2,
        backgroundColor: '#2F3454',
        padding: 15,
        // paddingBottom: 40,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    buttonStyle: {
      
        borderWidth: 1,
        
        borderColor: '#FF3E00',
        height: 80,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        marginBottom: 15,
    },
});