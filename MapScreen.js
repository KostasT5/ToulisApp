import * as React from 'react';
import {useState, setState, useEffect} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Animated, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating';
import { Icon } from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'


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
        isLoading: true
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
            await fetch('http://10.0.2.2:5000/places', {  //'http://192.168.43.218/places', {
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
            // await axios({
            //     method: 'post',
            //     url: 'http://10.0.2.2:5000/places',
            //     data: {
            //         latitude: this.state.latitude,
            //         longitude: this.state.longitude
            //     }
            // })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const temp = [];
                for (var item in response['data']['results']) {
                    temp.push({"id": response['data']['results'][item]["place_id"], "name": response['data']['results'][item]["name"], 
                    "lat": response['data']['results'][item]['geometry'].location['lat'], "lng": response['data']['results'][item]['geometry'].location['lng'], 
                    "icon": response['data']['results'][item]["icon"], "rating":response['data']['results'][item]['rating']});
                
                }
                this.setState({places: temp});
                console.log(this.state.places);
                this.setState({isLoading: false});
            });
        } catch (err) {
            console.error(err);
        }
        
        
    }

    componentDidMount() {
        this.requestLocationPermission();
        this.props.navigation;
    }

    handlePlace(place_id) {
        // console.log("PlaceScreen");
        this.props.navigation.navigate('PlaceScreen');
    } 

    checkDistance(place_id, place_lat, place_lng) {
        console.log('Checking Distance');   
        if ((Math.abs(this.state.latitude - place_lat) < 0.001)&&(Math.abs(this.state.longitude - place_lng) < 0.001)){
            console.log("Accessing place Details");
            this.handlePlace(place_id);
        } else {
            // alert("Move closer to the site to access more info");
        }
    }

    createMarker = () => {
        // console.log(this.state.places);
        return this.state.places.map((place) => 
            <Marker
                key={place.id}
                coordinate={{latitude: place.lat, longitude: place.lng}}
                title={place.name}
                // onPress = {this.checkDistance(place.lat, place.lng)}
                icon={place.icon}
            > 
                <Callout>
                    <View>
                        <View style={styles.bubble}>
                            <Text style={styles.name}>{place.name}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.checkDistance}
                            ><Text>More Info</Text></TouchableOpacity>
                        </View>
                        <View style={styles.arrowBorder}/>
                        <View style={styles.arrow}/>
                    </View>
                </Callout>
            </Marker>
            
        )
    }

    render() {

        console.log(this.state);

        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size='large'/>
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
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    
                    style={styles.scrollView}
                >
                    {this.state.places.map((place, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                source={require('./img/placeholder.jpg')}
                                style={styles.cardImage}
                            />
                            <View style={styles.textContent}>
                                <Text style={styles.cardTitle} numberOfLines={1}>{place.name}</Text>
                                {/* <Text style={styles.cardDescription}>Rating: {place.rating}</Text> */}
                                <StarRating 
                                    ratings={place.rating} 
                                    disabled={true}
                                    fullStarColor={'#FDF900'}
                                    emptyStarColor={'#BCBCBC'}
                                    starSize={20}
                                />

                                <TouchableOpacity
                                    onPress = {() => {
                                        this._map.animateToRegion({
                                            latitude: place.lat,
                                            longitude: place.lng,
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01
                                        });
                                        this.checkDistance(place.id, place.lat, place.lng);
                                    }}
                                >
                                    <Text style={styles.cardDescription}>View on Map</Text>
                                </TouchableOpacity>
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
        height: 220,
        width: width*0.8,
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
        fontSize: 17,
        // marginTop: 5,
        fontWeight: "bold",
        color: 'white',
    },
    cardDescription: {
        fontSize: 24,
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