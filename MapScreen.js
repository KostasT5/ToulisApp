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
import MapViewDirections from 'react-native-maps-directions';
import { min } from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

class MapScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state.user = this.props.route.params.user;
        this.state.history = this.props.route.params.history;
        this.handlePlace = this.handlePlace.bind(this);
    }
    
    // React.useEffect(() => {

    // })

    state = {
        latitude: '',
        longitude: '',
        initialPosition: {},
        places: [],
        user: null,
        isLoading: true,
        available_time: null,
        preference: 'closest',
        creatingPath: true,
        proximity: false,
        path: 'tourist attraction',
        history: null,
        waypointsA: [],
        waypointsB: [],
        waypointsC: [],
        waypointsD: [],
        waypointsSelected: [],
        pathTimeA: [],
        pathTimeB: [],
        pathTimeC: [],
        pathTimeD: [],
        destination: {latitude: 0, longitude:0},
        ready: false,
    }

    //Find User's Position

    requestLocationPermission = async () => {
        if(Platform.OS === 'android') {
        var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        
        if(response === 'granted') {
            this.locateCurrentPosition();
            // this.findPlace();
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
            // this.fetchHistory();
            this.findPlace();
            
        },
        error => {
            console.log(error);
            this.locateCoarsePosition();
        } ,
        {enableHighAccuracy: true, timeout: 3000, maximumAge: 10000}
        )      
    }

    locateCoarsePosition = () => {
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
                // this.fetchHistory();
                this.findPlace();
                
            },
            error => alert(error.message),
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
        )      
    }
    

    //Fetch Asyncronous Data

    async readData() {
        // console.log('Read username');
        try {
            const time = await AsyncStorage.getItem('time');
            this.setState({available_time: parseFloat(time)});
            console.log("Available time for path: "+this.state.available_time);
        } catch (e) {
            console.log('Failed to fetch the data from storage');
        }
    }

    //Fetch User's History from DB

    // async fetchHistory() {
    //     try{
    //         const username = await AsyncStorage.getItem('user_name');
    //         this.setState({user: username});
    //         await fetch('https://toulis-thesis.herokuapp.com/history', {  
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 AcceptLanguage: '*',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({    
    //                 user_name: this.state.user,                
    //             })
    //         })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             // if (response['result']=='202'){
    //                 // setHistory(response['history']);
    //             // }
    //             // console.log(response);
    //             // setHistory(response);
    //             let temp=[];
    //             for (let i=0; i<response.length; i++) {
    //                 temp.push(response[i][0]);
    //             }
    //             this.setState({history:temp});
    //             // console.log("history ", this.state.history);
    //             // this.setState({isLoading: false})
    //             this.findPlace();
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    
    //Query REST-API for Places

    async findPlace() {
        try{
            await fetch('https://toulis-thesis.herokuapp.com/places', {  
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
                // console.log(response);
                const temp = [];

                // Live use place fetching
                // for (var item in response) {
                //     temp.push({"id": response[item]["id"], "name": response[item]["name"], 
                //     "lat": response[item]['lat'], "lng": response[item]['lng'], 
                //     "icon": response[item]["icon"], "rating":response[item]['rating']});
                
                // }

                // Patras test place fetching
                
                // console.log("History: " + this.state.history);
                for (var item in response) {
                    if (this.state.history.includes(response[item][1])){
                        temp.push({"id": response[item][3], "name": response[item][1], "lat": response[item][0], "lng": response[item][2], "rating": response[item][4], "type": response[item][5], "visited": true, "total_visits": response[item][6]})
                    } else {
                        temp.push({"id": response[item][3], "name": response[item][1], "lat": response[item][0], "lng": response[item][2], "rating": response[item][4], "type": response[item][5], "visited": false, "total_visits": response[item][6]})
                    }
                }
                
                this.setState({places: temp});
                for (let i=0; i<this.state.places.length; i++){
                    console.log(this.state.places[i].name, this.state.places[i].visited);
                }
                this.setState({isLoading: false});
                this.splitWaypoints();
                // this.sortWaypoints();
                // this.calculateTime();
                // this.cutWaypoints();
                // this.setState({isLoading: false});
                
                
            });
        } catch (err) {
            console.error(err);
        }
        
    }

    // Functions to create Path

    // Finds straight line distance between two points
    haversine_distance(mk1, mk2) {
        var R = 6371.0710; // Radius of the Earth in km
        var rlat1 = mk1.latitude * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.latitude * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.longitude-mk1.longitude) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
    }

    splitWaypoints = () => {
        // console.log(this.state.places[0]);
        var paths=['tourist attraction', 'museum', 'church', 'park'];
        for (let k in paths) {
            var temp1 = [];
            // Get the relevant coordinates for the path
            for (var item in this.state.places) {
                if ((this.state.places[item].type===paths[k])&&(this.state.places[item].visited==false)) {
                    temp1.push({latitude: this.state.places[item].lat, longitude: this.state.places[item].lng});
                }
            }
            var temp2 = temp1;
            if (paths[k]==='tourist attraction'){
                this.setState({waypointsA: temp2});
            }
            if (paths[k]==='museum'){
                this.setState({waypointsB: temp2});
            }
            if (paths[k]==='church'){
                this.setState({waypointsC: temp2});
            }
            if (paths[k]==='park'){
                this.setState({waypointsD: temp2});
            }
        }
        // this.sortWaypoints();
        this.calculateWeights();
    }

    calculateWeights() {     
        // Add starting position as a waypoint node to each path
        var Waypoints = [this.state.waypointsA, this.state.waypointsB, this.state.waypointsC, this.state.waypointsD];
        // console.log("WaypointsA: ", this.state.waypointsA);
        // console.log(Waypoints[0]);
        var c=0;    
        for (let w of Waypoints) {
            // var Enum = [];
            // for (let p of w.entries()) {
            //     Enum.push(p);
                
            // }
            // var Weights = Array.from({length: Enum.length}, _ => new Array(Enum.length).fill(100000));
            // for (let i=0; i<Enum.length; i++) {
            //     for (let j=0; j<i; j++){
                    
            //         let val = this.haversine_distance(Enum[i][1], Enum[j][1]);
            //         Weights[i][j] = val;
            //         Weights[j][i] = val;
            //         // } else {
            //         //     Weights[i][j] = 1000000;
            //         // }
            //     }
                
                
            // }
            c++;
            // Once Weights Matrix is calculated pass it and the Waypoints array to the Nearest Neighbor Algorithm function
            // console.log(Weights);
            if (c===1) {
                var path = this.nearestNeighbor(w,c);
                this.setState({waypointsA: path});
            }
            if (c===2) {
                var path = this.nearestNeighbor(w,c);
                this.setState({waypointsB: path});
            }
            if (c===3) {
                var path = this.nearestNeighbor(w,c);
                this.setState({waypointsC: path});
            }
            if (c===4) {
                var path = this.nearestNeighbor(w,c);
                this.setState({waypointsD: path});
            }
        }
        
        // for (let )
        console.log("WaypointsA: ",this.state.waypointsA);
        this.setState({waypointsSelected: this.state.waypointsA});
        this.setState({destination: this.state.waypointsSelected.pop()});
        this.setState({creatingPath:false});
        
    }

    // Nearest Neighbor Algorithm 
    nearestNeighbor(Nodes, type) {
        var Visited = [{latitude:this.state.latitude, longitude:this.state.longitude}];

        var time_elapsed = 0;
        while ((Nodes.length>1) && (time_elapsed<=this.state.available_time)) {
            let min_dist=1000;
            let min_i = 0;

            // Search remaining nodes for the closest neighbor
            for (let i=0; i<Nodes.length; i++){
                let dist = this.haversine_distance(Visited[Visited.length-1], Nodes[i]);
                if (dist<min_dist) {
                    // console.log("malakas");
                    min_dist = dist;
                    min_i = i;
                }
            }
            let t = this.calculateTime(min_dist,type);
            time_elapsed=time_elapsed+t;
            let temp = Nodes[min_i];
            Nodes.splice(min_i,1);
            // console.log(Nodes);s
            // console.log("Temp: ", temp);
            Visited.push(temp);
            // console.log("Visited: ", Visited);
        }
            // console.log("Visited: ", Visited);
        //     var closest = Weights[start[0]].indexOf(Math.min(...Weights[start[0]]));
        //     var t = this.calculateTime(Math.min(...Weights[start[0]]), type);
        //     time_elapsed = time_elapsed +t;
        //     if (time_elapsed>this.state.available_time) {
        //         console.log("Time to complete path exceeds available time: ", this.state.available_time);
        //     }
        //     // console.log("Closest: ", closest);
        //     for (let i=0; i<Nodes.length; i++){
        //         if (Nodes[i][0]===closest){
        //             var temp = Nodes.splice(i,1);
        //         }
        //     }
        //     // console.log("Closest waypoint: ", Weights[start[0]].indexOf(Math.min(...Weights[start[0]])), " ",Math.min(...Weights[start[0]]))
            
        //     Nodes.unshift(temp[0]);

        //     // console.log("New Nodes: ",Nodes);
        // }
        console.log(Visited);
        return Visited;
    }

    // array_move(arr, old_index, new_index) {
    //     if (new_index >= arr.length) {
    //         var k = new_index - arr.length + 1;
    //         while (k--) {
    //             arr.push(undefined);
    //         }
    //     }
    //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    //     return arr; // for testing
    // }


    calculateTime(dist, type) {

        if (type!==2) {
            // console.log("Time to complete subpath: ", 1.2*dist/5 + 1/12);
            return 1.35*dist/5 + 1/12;
        } else {
            // console.log("Time to complete subpath: ", 1.2*dist/5 + 1/2);
            return 1.35*dist/5 + 1/2;
        }    
    }


    findDestination() {
        
        let w = this.state.waypointsSelected;
        this.setState({destination: this.state.waypointsSelected.slice(-1)[0]});
        console.log("Destination: "+this.state.destination.latitude + " " +this.state.destination.longitude);
        this.setState({creatingPath:false});
    }

    logPath() {
        console.log("Start is: " + this.state.initialPosition.latitude+ " "+ this.state.initialPosition.longitude);
        console.log("Waypoints of path are: ");
        for (let i=0; i<this.state.waypointsSelected.length; i++){
            console.log(this.state.waypointsSelected[i]);
        }
        console.log("Path destination: ");
        console.log(this.state.destination.latitude, this.state.destination.longitude);
    }

    // Handle Place Selection

    async checkDistance(place) {
        try {
            Geolocation.getCurrentPosition(
            position => {
                this.setState({latitude: position.coords.latitude, longitude:position.coords.longitude, ready: true});    
            },
            // error => {
            //     console.log(error);
            //     this.locateCoarsePosition();
            // } ,
            {enableHighAccuracy: true, timeout: 1000, maximumAge: 10000}
        )} catch (e) {
            Geolocation.getCurrentPosition(
                position => {
                    this.setState({latitude: position.coords.latitude, longitude:position.coords.longitude, ready: true});    
                },
                // error => {
                //     console.log(error);
                //     this.locateCoarsePosition();
                // } ,
                {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000}
            )
        }     
        // this.getPosition();
        var pos = {latitude: this.state.latitude, longitude: this.state.longitude}; 
        var loc = {latitude: place.lat, longitude: place.lng};
        if (this.haversine_distance(pos, loc) < 0.1){           //If user is within 100 meters of site they can leave a review
            // alert(this.haversine_distance(pos, loc));
            console.log('User close enough to leave review');
            this.setState({proximity: true});
            this.handlePlace(place);
        } else {
            console.log('User too far to leave review');
            // alert(this.haversine_distance(pos, loc));
            this.setState({proximity: false});
            this.handlePlace(place);
        }
    }

    handlePlace(place) {

        this.props.navigation.navigate('PlaceScreen', {place});    
           
    } 

    
    

    componentDidMount() {
        this.readData();
        this.requestLocationPermission();
        this.props.navigation;
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
                        onCalloutPress = {(e) => {e.stopPropagation(); this.handlePlace(place)}}
                    > 
                        <Callout>
                            {/* <View> */}
                                <View style={styles.bubble}>
                                    <Text style={styles.name}>
                                        {place.name}
                                        {/* <Button
                                            onPress = {
                                                (e) => {e.stopPropagation(); this.checkDistance(place)}
                                            }
                                            title = 'Details'
                                        /> */}
                                    </Text>
                                     
                                </View>
                                {/* <View style={styles.arrowBorder}/>
                                <View style={styles.arrow}/> */}
                            {/* </View> */}
                        </Callout>
                    </Marker>
                )
            }}
            
            
        )
    }   

    mapSection() {
        const Key = 'AIzaSyBSpTY-M9Ztfu7vKq8pqsusrGoe_FuUG4s';
        return(
            <MapView 
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                ref={map => this._map = map}
                style={styles.map}
                initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }}
            >                
                {this.createMarker()}
                
                <MapViewDirections
                    origin={{latitude: this.state.initialPosition.latitude, longitude: this.state.initialPosition.longitude}}
                    destination= {{latitude: this.state.destination.latitude, longitude: this.state.destination.longitude}}
                    apikey={Key}
                    waypoints={this.state.waypointsSelected}
                    mode="WALKING"
                    strokeWidth={3}
                    strokeColor="red"
                    onStart={() => {this.setState({creatingPath:false})}}
                    onError={(errorMessage) => {
                        console.log(errorMessage);
                    }}
                    // optimizeWaypoints={true}
                    splitWaypoints={true}
                />
            </MapView>
        )
    }

    cardSection() {
        return this.state.places.map((place, index) =>
            {if (place.type===this.state.path) {
                
                return(
                    <View style={styles.card} key={index}>
                        <View style={styles.textContent}>
                            <View style={{flex:1}}>
                                <Text style={styles.cardTitle} numberOfLines={2}>{place.name}</Text>
                            </View>
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
                                        this.handlePlace(place);
                                    }}
                                >
                                    <Text style={styles.cardDescription}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }}      
        )
    }

    

    render() {

        // console.log(this.state);
        // this.logPath();

        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size={50} color='#E50D0D'/>
                  <Text style={{fontSize:25, color:'red'}}>Fetching Places...</Text>
              </View>  
            );
        }

        if (this.state.creatingPath){
            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size={50} color='#E50D0D'/>
                    <Text style={{fontSize:22, color:'red'}}>Creating Path...</Text>
                </View>  
              );
        }

        
        // if (this.state.path==='tourist attraction'){
        return (
            <View>

                {this.mapSection()}
                <View style={{position:'absolute', top:0, backgroundColor: 'rgba(2, 17, 87, 0.7)', borderBottomEndRadius:10,}}>
                    <Text style={{fontSize:24, paddingLeft:10, paddingTop:5, fontWeight:'bold', color:'white',}}>Pick a path:</Text>
                    <Picker
                        selectedValue={this.state.path}
                        mode='dialog'
                        prompt='Pick a path:'
                        style={{width: width*0.65}}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({path: itemValue});
                            if (itemValue==='tourist attraction') {
                                let w = this.state.waypointsA;
                                this.setState({waypointsSelected: w});
                                this.setState({destination: w.pop()});
                                this.logPath();
                                // this.findDestination();
                            }
                            if (itemValue==='museum') {
                                // for (let i=0; i<this.state.waypointsB.length; i++){
                                //     console.log(this.state.waypointsB[i].latitude, this.state.waypointsB[i].longitude);
                                // }
                                let w = this.state.waypointsB;
                                this.setState({waypointsSelected: w});
                                this.setState({destination: w.pop()});
                                this.logPath();
                                // this.findDestination();
                            }
                            if (itemValue==='church') {
                                let w = this.state.waypointsC;
                                this.setState({waypointsSelected: w});
                                this.setState({destination: w.pop()});//slice(-1)[0]});
                                this.logPath();
                                // this.findDestination();
                            }
                            if (itemValue==='park') {
                                let w = this.state.waypointsD;
                                this.setState({waypointsSelected: w});
                                this.setState({destination: w.pop()});
                                this.logPath();
                                // this.findDestination();
                            }
                            // console.log("Path waypoints:");
                            // for (let i=0; i<this.state.waypointsSelected.length; i++) {
                                
                            //     console.log(this.state.waypointsSelected[i].latitude, this.state.waypointsSelected[i].longitude);
                            // }
                            // console.log(this.state.path);
                            // this.setState({creatingPath: true});
                            // this.calculatePath();
                    }}>
                        <Picker.Item label="Tourist Attractions" value="tourist attraction" color="#f05454" style={{fontSize: 20}}/>
                        <Picker.Item label="Museums" value="museum" color="#f05454" style={{fontSize: 20}}/>
                        <Picker.Item label="Churches" value="church" color="#f05454" style={{fontSize: 20}}/>
                        <Picker.Item label="Parks & Squares" value="park" color="#f05454" style={{fontSize: 20}}/>
                    </Picker>
                </View>

                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    
                    style={styles.scrollView}
                >
                    {this.cardSection()}
                </Animated.ScrollView>
            </View>
        );
       
        
    }

}


export default MapScreen

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
        backgroundColor: '#1C1E31',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
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