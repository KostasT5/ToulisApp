import * as React from 'react';
import {useState, setState, useEffect} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Animated, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chip } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const { width, height } = Dimensions.get("window");

export default class MapScreen extends React.Component{
    constructor(props) {
        super(props);
        // this.state = {
        //     places: this.props.dataParentToChild
        // }
        this.handlePlace = this.handlePlace.bind(this);
    }
    
    // React.useEffect(() => {

    // })

    state = {
        latitude: '',
        longitude: '',
        places: [],
        isLoading: true,
        creatingPath: true,
        proximity: false,
        path: 'tourist attraction',
        waypoints: [],
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
        try{
            await fetch('http://10.0.2.2:5000/places', {  
            method: 'POST',
            headers: {
                Accept: 'application/json',
                AcceptLanguage: '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: this.state.latitude,
                longitude: this.state.longitude
            })
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const temp = [];

                // Live use place fetching
                // for (var item in response) {
                //     temp.push({"id": response[item]["id"], "name": response[item]["name"], 
                //     "lat": response[item]['lat'], "lng": response[item]['lng'], 
                //     "icon": response[item]["icon"], "rating":response[item]['rating']});
                
                // }

                // Patras test place fetching
                for (var item in response) {
                    // console.log(item);
                    temp.push({"id": response[item][3], "name": response[item][1], "lat": response[item][0], "lng": response[item][2], "rating": response[item][4], "type": response[item][5]})
                }
                this.setState({places: temp});
                // console.log(this.state.places)
                // console.log(this.state.places);
                this.setState({isLoading: false});
                this.calculatePath();
            });
        } catch (err) {
            console.error(err);
        }
        // this.setState({isLoading: false});
        
    }

    componentDidMount() {
        this.requestLocationPermission();
        this.props.navigation;
    }

    async handlePlace(place) {
        try {
            await AsyncStorage.setItem('place_id', place.id);
            await AsyncStorage.setItem('place_name', place.name);
            await AsyncStorage.setItem('place_lat', JSON.stringify(place.lat));
            await AsyncStorage.setItem('place_lng', JSON.stringify(place.lng));
            await AsyncStorage.setItem('place_rating', JSON.stringify(place.rating));
            // if (this.state.review){
            //     console.log('review=true');
            var proximity = this.state.proximity;
            this.props.navigation.navigate('PlaceScreen', {place, proximity});
            // } else {
            //     this.props.navigation.navigate('PlaceScreen2', {place});
            // }
            
        } catch (e) {
            console.log(e);
        }
        // console.log("PlaceScreen");
        
    } 

    checkDistance(place) {
        console.log('Checking Distance');   
        if ((Math.abs(this.state.latitude - place.lat) < 0.0011)&&(Math.abs(this.state.longitude - place.lng) < 0.0011)){
            console.log('User close enough to leave review');
            this.setState({proximity: true});
            this.handlePlace(place);
        } else {
            console.log('User too far to leave review');
            this.handlePlace(place);
        }
    }

    createMarker = () => {
        // console.log(this.state.places);
        
        return this.state.places.map((place) => 
            {if (place.type===this.state.path) {
                return (
                    <Marker
                        key={place.id}
                        coordinate={{latitude: place.lat, longitude: place.lng}}
                        title={place.name}
                        // onPress = {this.checkDistance(place.lat, place.lng)}
                        icon={{url: place.icon}}
                    > 
                        <Callout>
                            <View>
                                <View style={styles.bubble}>
                                    <Text style={styles.name}>{place.name}</Text>
                                </View>
                                <View style={styles.arrowBorder}/>
                                <View style={styles.arrow}/>
                            </View>
                        </Callout>
                    </Marker>
                )
            }}
            // <Marker
            //     key={place.id}
            //     coordinate={{latitude: place.lat, longitude: place.lng}}
            //     title={place.name}
            //     icon={{url: place.icon}}
            // > 
            //     <Callout>
            //         <View>
            //             <View style={styles.bubble}>
            //                 <Text style={styles.name}>{place.name}</Text>
            //             </View>
            //             <View style={styles.arrowBorder}/>
            //             <View style={styles.arrow}/>
            //         </View>
            //     </Callout>
            // </Marker>
            
        )
    }

    calculatePath = () => {
        var temp1 = []
        // Get the relevant coordinates for the path
        for (var item in this.state.places) {
            if (this.state.places[item].type===this.state.path) {
                temp1.push({latitude: this.state.places[item].lat, longitude: this.state.places[item].lng});
            }
        }
        // Sort them based on their distance from the user
        for (let i=0; i < temp1.length; i++) {
            for (let j=0; j < (temp1.length-i-1); j++) {
                if ( ( Math.abs(this.state.latitude - temp1[j][0]) + Math.abs(this.state.longitude - temp1[j][1]) ) > ( Math.abs(this.state.latitude - temp1[j+1][0]) + Math.abs(this.state.longitude - temp1[j+1][1]) ) ){
                    let temp = temp1[j];
                    temp1[j] = temp1[j + 1];
                    temp1[j + 1] = temp;
                }
            }
        }
        this.setState({waypoints: temp1});
    }
    // async storePlace(place) {

    // }

    render() {

        // console.log(this.state);

        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size={50} color='#E50D0D'/>
                  <Text style={{fontSize:22, color:'red'}}>Fetching Places...</Text>
              </View>  
            );
        }
        
        return (
            <View>

                <MapView 
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}>                
                    {this.createMarker()}
                    {/* {this.calculatePath()} */}
                    <Polyline 
                        coordinates={this.state.waypoints}
                    />
                </MapView>
                <View style={{position:'absolute', top:10,}}>
                    <Text style={{fontSize:22, paddingLeft:10,}}>Pick a path:</Text>
                    <Picker
                        selectedValue={this.state.path}
                        mode='dropdown'
                        prompt='Pick a path:'
                        style={{width: width*0.6}}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({path: itemValue});
                            console.log(this.state.path);
                    }}>
                        <Picker.Item label="Tourist Attractions" value="tourist attraction" />
                        <Picker.Item label="Museums" value="museum" />
                        <Picker.Item label="Churches" value="church" />
                        <Picker.Item label="Parks & Squares" value="park" />
                    </Picker>
                </View>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    
                    style={styles.scrollView}
                >
                    {this.state.places.map((place, index) => (
                        <View style={styles.card} key={index}>
                            {/*
                            <Image
                                source={require('./img/placeholder.jpg')}
                                style={styles.cardImage}
                            />
                            */}
                            <View style={styles.textContent}>
                                <View style={{flex:1}}>
                                    <Text style={styles.cardTitle}>{place.name}</Text>
                                </View>
                                
                                {/* <Text style={styles.cardDescription}>Rating: {place.rating}</Text> */}
                                <View style={{flex:1, paddingTop:15}}>
                                    <StarRating 
                                        rating={place.rating} 
                                        disabled={true}
                                        fullStarColor={'#FDF900'}
                                        emptyStarColor={'#BCBCBC'}
                                        starSize={25}
                                        containerStyle={{paddingLeft:30, paddingRight:30}}
                                    />
                                </View>
                                <View style={{flex:1,}}>
                                    <TouchableOpacity
                                        onPress = {() => {
                                            this._map.animateToRegion({
                                                latitude: place.lat,
                                                longitude: place.lng,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01
                                            });
                                            console.log('Details');
                                            this.checkDistance(place);
                                        }}
                                    >
                                        <Text style={styles.cardDescription}>Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
            </View>
        

        );
    }

}


// export default MapScreen

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
        borderColor: '#2F3454',
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
    tag: {
        backgroundColor: '#1C1E31',
        borderRadius: 20,
        padding: 9,
        marginTop: 20,
    },
    tag_name:{
        color: 'white',
    },
    container: {
        backgroundColor: '#1C1E31',
        flex: 1,
        paddingTop: 23
    },
    innerText: {
        color: '#ffffff',
        flex: 1
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    chipsScrollView: {
        position:'absolute',
        paddingHorizontal: 10,
    },
    chipsItem: {
        flexDirection: 'row',
        backgroundColor:'#fff',
        borderRadius:20,
        padding:0,
        paddingHorizontal:20,
        marginHorizontal:10,
        height:35,
        shadowColor:'#ccc',
        shadowOffset:{width:0, height:3},
        shadowOpacity: 0.5,
        shadowRadius:5,
        elevation:10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#2F3454",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 150,
        width: width*0.6,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontSize: 22,
        // marginTop: 5,
        fontWeight: "bold",
        color: 'white',
    },
    cardDescription: {
        // paddingTop: 10,
        // position: 'absolute',
        // top: 10,
        fontSize: 22,
        color: "#f05454",
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
        backgroundColor: '#2F3454',
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