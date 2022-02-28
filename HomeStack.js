import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createAppContainer } from 'react-navigation'
import MapScreen from './MapScreen'
import UserScreen from './UserScreen'
import TestScreen from './TestScreen'

const screens = {
    Map: {
        screen: MapScreen,
        navigationOptions: {
            title: 'Map',
            
        }
    },
    // User: { 
    //     screen: UserScreen,
    //     navigationOptions: {
    //         title: 'User',
            
    //     }
    // }
    Test: {
        screen: TestScreen,
    }
}

const HomeStack = createDrawerNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: "#eee", height: 60}
    }
});

export default HomeStack;