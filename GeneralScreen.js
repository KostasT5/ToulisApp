import * as React from 'react';
import {useState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
// import SettingsScreen from './settings.js'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './registerpage.js'
import StartingScreen from './loginorregister.js'
// import User from './UserScreen.js'


function HomeScreen() {
    const [places, setPlaces] = useState([
        {name: 'Place 1', key: '1', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 2', key: '2', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 3', key: '3', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 4', key: '4', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 5', key: '5', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 6', key: '6', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 7', key: '7', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 8', key: '8', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},  
        {name: 'Place 9', key: '9', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 10', key: '10', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 11', key: '11', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 12', key: '12', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 13', key: '13', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 14', key: '14', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 15', key: '15', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {name: 'Place 16', key: '16', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},  
    ]);
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>Places near you:</Text>
        <FlatList
            style={styles.list}
            data={places}
            renderItem={({item}) => (
                <View>
                    <Text style={styles.item}>{item.name}</Text>
                    <Text style={styles.innerText}>{item.description}</Text>
                </View>
            )}
        />
      </View>
    );
}
  
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



class MapScreen extends React.Component{

state = {
    coordinates: [
    {name: 'Patras', latitude: 38.246550, longitude: 21.734669},
    ]
}

requestLocationPermission = async () => {
    if(Platform.OS === 'android') {
    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    
    if(response === 'granted') {
        this.locateCurrentPosition();
    }
    } else {

    }
}


locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
    position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
        }

        this.setState({initialPosition});
    },
    error => Alert.alert(error.message),
    {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    )
}

componentDidMount() {
    this.requestLocationPermission();
}

render() {
    return (
    
        <MapView 
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            ref={map => this._map = map}
            style={styles.map}
            initialRegion={this.state.initialPosition}>
            <Marker
                coordinate={{latitude: 38.246550, longitude: 21.734669}}
                // coordinate={this.state.initialPosition.latitude, this.state.initialPosition.longitude}
                title={'Position'}
            >
            {/* <Callout>
                <Image 
                source={require('./img/Map_Icons/chat.png')} 
                style={styles.map_image}
                />
                <Text>You are here</Text>
            </Callout> */}
                {/* <Image 
                source={require('./img/Map_Icons/chat.png')} 
                style={styles.map_image}
                /> */}
            </Marker>
        </MapView>
    

    );
}

}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#FFFFFF"
        inactiveColor="#222831"
        // inactiveColor = "#FF3E00"
        barStyle={{ 
            // backgroundColor: '#2D068E',
            backgroundColor: '#f05454',
            // height: 55,
            // paddingBottom: 10
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',

                tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/Tab_icons/home.png')}
                    style={[styles.icon, {tintColor: '#c4c4c4'}]} />
                )
            }} 
        />
        <Tab.Screen 
            name="Map" 
            component={MapScreen} 
            options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/Tab_icons/placeholder.png')}
                    style={[styles.icon, {tintColor: '#c4c4c4'}]} />
                )
            }} 
        />
        <Tab.Screen 
            name="User" 
            component={UserScreen} 
            options={{
                tabBarLabel: 'User',
                tabBarIcon: ({tintColor }) => (
                <Image
                    source={require('./img/Tab_icons/user.png')}
                    style={[styles.icon, {tintColor: '#c4c4c4'}]} />
                )
            }} 
        />
    </Tab.Navigator>
    // </NavigationContainer>
);
}



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
    loginBttn: {
        color:'white',
        backgroundColor:'white'
    },
    loginText: {
        color:'blue'
    },
    registerButton: {

    },
    container: {
        backgroundColor: '#222831',
        flex: 1,
        paddingTop: 23
    },
    innerText: {
        color: '#ffffff',
        flex: 1
    },
    title: {
        fontSize: 35,
        color: '#ffffff',
        // marginBottom: 30,
        marginTop: 0,
        paddingLeft: 10,
        paddingBottom: 20,
        
    },
    item :{
        fontSize: 25,
        color: '#ffffff',
        paddingBottom: 10,
        paddingLeft: 15,
    },
    list: {
        flex: 1,
        backgroundColor: '#30475e',
        padding: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
});
  