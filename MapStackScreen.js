import * as React from 'react';
import { Button } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import MapScreen from './MapScreen';
import PlaceScreen from './PlaceScreen';

const MapStack = createStackNavigator();

const MapStackScreen = ({navigation, route}) => {
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