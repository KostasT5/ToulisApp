import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
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


function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Home!</Text>
        {/* <Button 
          title = 'Login'
        /> */}
      </View>
    );
}
  
function UserScreen() {
return (
    <View style={ styles.container }>
    <Text>User!</Text>
    </View>
);
}

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedPage: 'Start'}
    }

    renderCaseView = (param) => {
        switch(param) {
            case 'Start':
                return <StartingScreen />;
                break;
            case 'Login':
                return <LoginScreen />;
                break;
            case 'Register':
                return <RegisterScreen />
                break;
            
        }
    }

    handleLogin = () => {
        // console.log("Login");
        return <LoginScreen />;
        // navigation.push('LoginScreen');
    }
    
    render() {
        // var loginToken = False;
        return(
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //     <Text>Settings!</Text>
                   
            //     <TouchableOpacity
            //         style = {styles.loginBttn}
            //         onPress = {this.handleLogin
            //             // () => console.log("button")
            //         }>
            //         <Text 
            //             style = {styles.loginText}
            //         >Login</Text>
            //     </TouchableOpacity>
            //     <Text>or</Text>
            //     <TouchableOpacity
            //         style = {styles.loginBttn}
            //         onPress = {
            //             () => console.log("registerbutton")
            //         }>
            //         <Text 
            //             style = {styles.loginText}
            //         >Register</Text>
            //     </TouchableOpacity>
            // </View>
            
            <LoginScreen />
            // <RegisterScreen />
        );
    }
    
    
    
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
        inactiveColor="#B5B2B8"
        // inactiveColor = "#FF3E00"
        barStyle={{ 
            // backgroundColor: '#2D068E',
            backgroundColor: '#C34E01',
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
        <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
                tabBarLabel: 'Settings',
                tabBarOptions: {
                // activeTintColor: '#FF2300',
                inactiveTintColor: '#ffffff'
        
                },
                tabBarIcon: ({tintColor}) => (
                <Image
                    // color={tintColor}
                    source={require('./img/Tab_icons/settings.png')}
                    style={[styles.icon, {tintColor: '#c4c4c4'}
                ]} />
                ),

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
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        },
    submitButtonText:{
        color: 'white'
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
        backgroundColor: '#1C1C1C',
        flex: 1,
        paddingTop: 23
    },
});
  