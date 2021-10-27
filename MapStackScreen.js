import * as React from 'react';
import {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button,  } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import MapScreen from './MapScreen';
import MapScreen2 from './MapScreen2';
import PlaceScreen from './PlaceScreen';
import { TabRouter } from 'react-navigation';

const MapStack = createStackNavigator();


const MapStackScreen = ({navigation, route}) => {
    // const [user, setUser] = useState(this.props.route.params.user);
    // const [history, setHistory] = useState(this.props.route.params.history);
    return(
        <MapStack.Navigator headerMode = 'none' initialRouteName='MapScreen'>
            
            <MapStack.Screen name = 'MapScreen' component = {MapScreen} initialParams = {{user: route.params.user, history: route.params.history}}/>
            
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
            
            
            
        </MapStack.Navigator>
    );
}

export default MapStackScreen;