import * as React from 'react';
import {useState, setState} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
// import SettingsScreen from './settings.js'
import LinearGradient from 'react-native-linear-gradient'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './registerpage.js'
import StartingScreen from './loginorregister.js'
// import User from './UserScreen.js'
// import apiKey from './google_api_key.txt'

class HomeScreen extends React.Component{
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         places: this.props.dataParentToChild
    //     }
    //     // this.state = {
    //     //     places: this.props.dataParentToChild
    //     // }
    //     // console.log(places);
    // } 

    state = {
        latitude: '',
        longitude: '',
        places: []      
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
       
            let initialPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
            }
          
            this.setState({initialPosition});
            this.setState({latitude: initialPosition.latitude, longitude:initialPosition.longitude});
       
            this.findPlace();
            
            
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        )
        
       
    }
    async findPlace() {
        const apiKey = 'AIzaSyBSpTY-M9Ztfu7vKq8pqsusrGoe_FuUG4s'
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
        const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude}, ${this.state.longitude}&radius=3000&type=tourist_attraction&key=${apiKey}`
        try{
            const result = await fetch(apiURL);
            const json = await result.json();
            var json_res = json['results'];
            const temp = [];
            for (var item in json_res) {
                temp.push({"id": json_res[item]["place_id"], "name": json_res[item]["name"], "lat": json_res[item]['geometry'].location['lat'], 
                    "lng": json_res[item]['geometry'].location['lng'], "icon": json_res[item]["icon"]});
                try {
                    temp.push({"photo_id": json_res[item]["photos"][0].photo_reference});
                } catch (err) {
                    temp.push({"photo_id": "unavailable"}); //'"https://media.fdmckosovo.org/2020/07/placeholder.png"'});
                }
            }
            this.setState({places: temp});
            this.getPhoto();
        } catch (err) {
            console.error(err);
        }
        // for (var i in this.state.places) {
        //     console.log(this.state.places[i].photo_id);
        // }
       
        
    }
    getPhoto() {
        const apiKey = 'AIzaSyBSpTY-M9Ztfu7vKq8pqsusrGoe_FuUG4s'
        // console.log('getphoto');
        for (var i in this.state.places) {
            var apiURL = `https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photoreference=${this.state.places[i].photo_id}&maxheight=200&maxwidth=200`
            try{
                // console.log(this.state.places[i].name);
                // var xhr = new XMLHttpRequest();
                // xhr.open('GET', apiURL, true);
                // xhr.onload = () => {
                //     // this.setState({imageUrl: xhr.responseURL});
                //     console.log(this.state.places[i].name);
                //     console.log(xhr.responseURL);
                // };
                // xhr.send(null);
            
            } catch (err) {
                console.log(err);
            }
        }
    }

    componentDidMount() {
        this.requestLocationPermission();
        // this.findPlace();
        this.props.navigation;
        // console.log(this.props.places);
    }

    render(){
        // console.log(this.state.places);
        return (
            <View style={styles.container}>
              
              <Text style={styles.title}>Places near you:</Text>
              <FlatList
                  style={styles.list}
                  data={this.state.places}
                //   keyExtractor={(item,index) => item.id}
                //   key={item.id}
                  renderItem={({item}) => (
                      <View>
                          <Text style={styles.item} key={item.id}>{item.name}</Text>
                          {/* <Text style={styles.item}>{item.photo}</Text> */}
      
                      </View>
                  )}
              />
            </View>
          );
    }
    
}
  
function UserScreen({navigation}) {
    const [history,setHistory] = useState([
        {name: 'Place 1', key: '1', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 2', key: '2', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 3', key: '3', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 4', key: '4', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 5', key: '5', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 6', key: '6', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 7', key: '7', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 8', key: '8', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},  
        {name: 'Place 9', key: '9', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 10', key: '10', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 11', key: '11', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 12', key: '12', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 13', key: '13', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 14', key: '14', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 15', key: '15', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
        {name: 'Place 16', key: '16', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, 
    ]);
    const logoutHandler = () => {
        navigation.navigate('SplashScreen');
    }
    return (
        <View style={ styles.container }>
            <TouchableOpacity
                // style = {styles.submitButton}
                onPress = {
                    logoutHandler
                }>
                    <LinearGradient
                        colors={['#f05454','#FF1D1D']}
                        style={styles.buttonStyle}    
                    >
                    <Text style={styles.buttonText}>Logout</Text>
                </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.title}>History</Text>
            <FlatList
                style={styles.list}
                data={history}
                renderItem={({item}) => (
                    <View>
                        <Text style={styles.item}>{item.name}</Text>
                        <Text style={styles.innerText}>{item.comment}</Text>
                    </View>
                )}
            />
        </View>
    );
}



class MapScreen extends React.Component{
    constructor(props) {
        super(props);
        this.handlePlace = this.handlePlace.bind(this);
    }
    

    state = {
        // coordinates: [
        // {name: 'Patras', latitude: 38.246550, longitude: 21.734669},
        // ],
        // position: [
        //     {
        latitude: '',
        longitude: '',
        places: []
        //     }
            
        // ]
        
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
            // console.log(JSON.stringify(position));

            let initialPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
            }
            // console.log(initialPosition.latitude,initialPosition.longitude);
            this.setState({initialPosition});
            this.setState({latitude: initialPosition.latitude, longitude:initialPosition.longitude});
            // console.log(this.state.latitude);
            this.findPlace();
            // console.log(this.state.latitude);
            // console.log(this.state.longitude);
            // this.state.latitude = initialPosition.latitude;
            // this.state.longitude = initialPosition.longitude;
            
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        )
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
       
    }

    async findPlace() {
        const apiKey = 'AIzaSyBSpTY-M9Ztfu7vKq8pqsusrGoe_FuUG4s'
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
        const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude}, ${this.state.longitude}&radius=3000&type=tourist_attraction&key=${apiKey}`
        try{
            const result = await fetch(apiURL);
            const json = await result.json();
            var json_res = json['results'];
            // console.log(json['results']['geometry'].location);
            // this.state.places = json['results'];
            // this.setState({places: [json['results']['place_id'], json['results']['name'], json['results']['geometry']]});
            // console.log(this.state.places);  

            const temp = [];
            for (var item in json_res) {
                temp.push({"id": json_res[item]["place_id"], "name": json_res[item]["name"], "lat": json_res[item]['geometry'].location['lat'], "lng": json_res[item]['geometry'].location['lng'], "icon": json_res[item]["icon"]});
                // console.log(this.state.places[item]["geometry"].location);
                // this.setState({places: [json['results']['place_id'], json['results']['name'], json['results']['geometry']]});
            }
            // console.log(places_id);
            this.setState({places: temp});
            // console.log(this.state.places);
            // console.log(this.state.places[0][2].lat);
        } catch (err) {
            console.error(err);
        }
      
        
    }

    componentDidMount() {
        this.requestLocationPermission();
        // this.findPlace();
        this.props.navigation;
    }

    handlePlace = ({navigation}) => {
        // console.log("PlaceScreen");
        this.props.navigation.navigate('PlaceScreen');
    } 

    createMarker = () => {
        // console.log(this.state.places);
        return this.state.places.map((place) => 
            <Marker
                key={place.id}
                coordinate={{latitude: place.lat, longitude: place.lng}}
                title={place.name}
                // icon={place.icon}
            />
            
        )
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
                    onPress = {this.handlePlace}
                />
                {this.createMarker()}
                
                {/* {this.state.places.map(places => (
                    <MapView.Marker 
                    coordinate={{places["geometry"].location["lat"], }}
                    title={marker.title}
                    />
                ))} */}


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

                {/* </Marker> */}
            </MapView>
        

        );
    }

}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();



export default class App extends React.Component{

    constructor(props) {
        super(props);
        // this.handlePlace = this.handlePlace.bind(this);
    }
    
    state = {
        
        latitude: '',
        longitude: '',
        places: []
        
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
            // console.log(JSON.stringify(position));

            let initialPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
            }
            // console.log(initialPosition.latitude,initialPosition.longitude);
            this.setState({initialPosition});
            this.setState({latitude: initialPosition.latitude, longitude:initialPosition.longitude});
            // console.log(this.state.latitude);
            this.findPlace();
            // console.log(this.state.latitude);
            // console.log(this.state.longitude);
            // this.state.latitude = initialPosition.latitude;
            // this.state.longitude = initialPosition.longitude;
            
        },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        )
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
       
    }

    async findPlace() {
        const apiKey = 'AIzaSyBSpTY-M9Ztfu7vKq8pqsusrGoe_FuUG4s'
        // console.log(this.state.latitude);
        // console.log(this.state.longitude);
        const apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude}, ${this.state.longitude}&radius=3000&type=tourist_attraction&key=${apiKey}`
        try{
            const result = await fetch(apiURL);
            const json = await result.json();
            var json_res = json['results'];
            // console.log(json['results']['geometry'].location);
            // this.state.places = json['results'];
            // this.setState({places: [json['results']['place_id'], json['results']['name'], json['results']['geometry']]});
            // console.log(this.state.places);  

            const temp = [];
            for (var item in json_res) {
                temp.push({"id": json_res[item]["place_id"], "name": json_res[item]["name"], "lat": json_res[item]['geometry'].location['lat'], "lng": json_res[item]['geometry'].location['lng'], "icon": json_res[item]["icon"]});
                // console.log(this.state.places[item]["geometry"].location);
                // this.setState({places: [json['results']['place_id'], json['results']['name'], json['results']['geometry']]});
            }
            // console.log(places_id);
            this.setState({places: temp});
            // console.log(this.state.places);
            // console.log(this.state.places[0][2].lat);
        } catch (err) {
            console.error(err);
        }
        // console.log(this.state.places);
      
        
    }

    componentDidMount() {
        this.requestLocationPermission();
        // this.findPlace();
        this.props.navigation;
        
    }
    render() {
        // console.log(this.state.places);
        return (
            // <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="#FFFFFF"
                inactiveColor="#222831"
                // inactiveColor = "#FF3E00"
                // dataParentToChild = {this.state.places}
                barStyle={{ 
                    // backgroundColor: '#2D068E',
                    backgroundColor: '#f05454',
                    // height: 55,
                    // paddingBottom: 10
                }}
            >
                <Tab.Screen 
                    name="Home" 
                    // children={() => <HomeScreen 
                    //     places={this.state.places}
                    //     options={{
                    //         tabBarLabel: 'Home',
            
                    //         tabBarIcon: ({ tintColor }) => (
                    //         <Image
                    //             source={require('./img/Tab_icons/home.png')}
                    //             style={[styles.icon, {tintColor: '#c4c4c4'}]} />
                    //         )
                    //     }} 
                    // />}
                    component={HomeScreen}
                    // dataParentToChild = {this.state.places}
                    
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
        // paddingTop: 20,
        
    },
    item :{
        fontSize: 25,
        color: '#ffffff',
        paddingBottom: 10,
        paddingLeft: 15,
        paddingTop: 10,
    },
    list: {
        flex: 1,
        backgroundColor: '#30475e',
        padding: 15,
        // paddingBottom: 40,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    buttonStyle: {
        // flex: 1,
        // flexDirection: 'column',
        // backgroundColor: '#f05454',
        borderWidth: 1,
        // color: '#9dbeb7',
        borderColor: '#FF3E00',
        height: 40,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 15,
    },
});
  