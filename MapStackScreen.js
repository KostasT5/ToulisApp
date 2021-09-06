import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import MapScreen from './MapScreen';
import PlaceScreen from './PlaceScreen';
import PlaceScreen2 from './PlaceScreen2';
import PlaceScreen3 from './PlaceScreen3';

const MapStack = createStackNavigator();

const MapStackScreen = ({navigation}) => {
    return(
        <MapStack.Navigator headerMode = 'none' initialRouteName='MapScreen'>
            
            <MapStack.Screen name = 'MapScreen' component = {MapScreen}/>
            
            <MapStack.Screen 
                name = 'PlaceScreen' 
                component = {PlaceScreen}
                options={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('MapScreen')}
                        />
                    )
                    
                }}
            />
            <MapStack.Screen 
                name = 'PlaceScreen2' 
                component = {PlaceScreen2}
                options={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('MapScreen')}
                        />
                    )
                    
                }}
            />

            <MapStack.Screen 
                name = 'PlaceScreen3' 
                component = {PlaceScreen3}
                options={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerLeft: () => (
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('MapScreen')}
                        />
                    )
                    
                }}
            />
            
            
        </MapStack.Navigator>
    );
}

export default MapStackScreen;