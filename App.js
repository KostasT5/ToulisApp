
import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import General from './general.js'
import RootStackScreen from './RootStackScreen.js'
import { LogBox } from 'react-native';
// import Tab_icons from './img';
// import Icon from 'react-native-vector-icons/Ionicons'; 










const Stack = createStackNavigator();

function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  return(
    <NavigationContainer>
        <RootStackScreen />
       {/* <Stack.Navigator>
         <Stack.Screen name = "Login" component = {LoginScreen}/>
         <Stack.Screen name = "Register" component = {RegisterScreen}/>
         <Stack.Screen name = "General" component = {General}/>
       </Stack.Navigator> */}
    </NavigationContainer>

  );
  
}

export default App;


const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  icon: {
    // activeTintColor: '#FF2300',
    width: 28,
    height: 26,
    // tintColor: '#FFFFFF',
    paddingBottom: 10,
    // marginBottom: 500
    borderBottomWidth: 10
  },
  map_image: {
    height: '50%',
    width: '50%'
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
    },
    submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    },
    submitButtonText:{
    color: 'white'
    }
});
