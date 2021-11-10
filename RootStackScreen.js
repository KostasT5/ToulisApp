import React from 'react'
import { Button } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import SplashScreen from './SplashScreen.js'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './RegisterScreen.js'
import GeneralScreen from './GeneralScreen.js'
import PlaceScreen from './PlaceScreen.js'
import SettingsScreen from './SettingsScreen.js'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    return(
        <RootStack.Navigator headerMode = 'none'>       
            <RootStack.Screen name = 'SplashScreen' component = {SplashScreen}/>
            <RootStack.Screen 
                name = 'LoginScreen' 
                component = {LoginScreen}
                options={{
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('SplashScreen')}
                        />
                    )             
                }}
            />
            <RootStack.Screen 
                name = 'RegisterScreen' 
                component = {RegisterScreen}
                options={{
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('SplashScreen')}
                        />
                    )               
                }}
            />
            <RootStack.Screen name = 'GeneralScreen' component = {GeneralScreen}/>
            <RootStack.Screen 
                name = 'PlaceScreen' 
                component = {PlaceScreen}
                options={{
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('GeneralScreen')}
                        />
                    )                  
                }}
            />
            <RootStack.Screen name = 'SettingsScreen' component = {SettingsScreen}/>
            
        </RootStack.Navigator>
    );
}

export default RootStackScreen;