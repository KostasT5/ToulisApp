import React, { Component, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import SplashScreen from './SplashScreen.js'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './RegisterScreen.js'
import GeneralScreen from './general.js'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    return(
        <RootStack.Navigator headerMode = 'none'>
            <RootStack.Screen name = 'SplashScreen' component = {SplashScreen}/>
            <RootStack.Screen name = 'LoginScreen' component = {LoginScreen}/>
            <RootStack.Screen name = 'RegisterScreen' component = {RegisterScreen}/>
            <RootStack.Screen name = 'GeneralScreen' component = {GeneralScreen}/>
        </RootStack.Navigator>
    );
}

export default RootStackScreen;