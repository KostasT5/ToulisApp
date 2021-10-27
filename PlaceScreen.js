import React, {useState, useEffect, Component, setState} from 'react';
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
//   Animated,
  ActivityIndicator,
} from 'react-native';

import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Header from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import Animated from 'react-native-reanimated';
import {launchImageLibrary} from 'react-native-image-picker';


const { width, height } = Dimensions.get("window");

class PlaceScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        rating: 0,
        comment: '',
        place:{},
        user_reviews: [],
        first_visit: true,
        isLoading: true,
        image: {
            uri: null,
            base64: null
        },
        gallery: [],
        proximity: false,
    }
    
    // async placeData() {
    //     try {
    //         const temp1 = await AsyncStorage.getItem('place_id');
    //         const temp2 = await AsyncStorage.getItem('place_name');
    //         const temp3 = await AsyncStorage.getItem('place_lat');
    //         const temp4 = await AsyncStorage.getItem('place_lng');
    //         const temp5 = await AsyncStorage.getItem('place_rating');
    //         if (temp1 !== null) {
    //             this.setState({place: {
    //                 id: temp1,
    //                 name: temp2,
    //                 lat: temp3,
    //                 lng: temp4,
    //                 rating: temp5,
    //             }});
    //             this.fetchReviews();
    //             // this.checkFirstVisit();
    //         } else {
    //             console.log('Place details were not saved');
    //         }
    //     } catch (e) {
    //         console.log('Failed to fetch the data from storage');
    //     }
    // }

    async fetchReviews() {
        const place_id = this.props.route.params.place.id;
        fetch('https://toulis-thesis.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // AcceptLanguage: '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                place_id: place_id,
            })
        })
        // .then((response) => {
        //     if (response.status==400){
        //         console.log('No registered reviews');
        //     }
        // })          
        .then((response) => 
            // console.log("Status: ", response.status);
            // if (response.status == 400){
            //     console.log("No reviews rageistered for this place");
            // }
            response.json()
            // console.log(response);
        )
 
        .then((response) => {
            if (response.length){
                // console.log(response);
                const temp = [];
                const pics = [];
                for (var item in response) {
                    temp.push({"user": response[item][4], "rating": response[item][3], 
                    "comment": response[item][2]});
                    if (response[item][7]) {
                        pics.push(response[item][7]);
                    }
                }
                this.setState({user_reviews: temp});
                this.setState({gallery: pics});
                // console.log(this.state.user_reviews);
            }
            this.checkFirstVisit();
            
        })
            // console.log(response))               
        .catch((error) => console.log(error));
    }

    async checkFirstVisit() {
        try{
            const user = await AsyncStorage.getItem('user_name');
            console.log(user);
            fetch('https://toulis-thesis.herokuapp.com/check_history', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // AcceptLanguage: '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                place_id: this.props.route.params.place.id,
                user_name: user,
            })
        })          
        .then((response) => 
            response.json())
        .then((response) => {
            
            if (response.length){
                console.log("USer has already visited this place");
                console.log(response);
                this.setState({first_visit: false});
                this.setState({rating: response[0][3], comment: response[0][2]});
                // console.log(this.state.rating, this.state.comment);
                
            }
        })
        } catch (e) {
            console.log(e);
        }
        // this.setState({isLoading: false});
        // console.log('Check First Visit')
        this.setState({isLoading:false});
    }

    ratingHandler(val){
        this.setState({rating: val});
        console.log(this.state.rating);
    }

    commentHandler(val){
        this.setState({comment: val});
    }

    async submitReview() {
        const user = await AsyncStorage.getItem('user_name');
        console.log(this.state.place);
        console.log(user);
        console.log(this.state.rating);
        console.log(this.state.comment);
        try{
            await fetch('https://toulis-thesis.herokuapp.com/review', {  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    AcceptLanguage: '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // place_id: this.state.place.id,
                    // place_name: this.state.place.name,
                    place: this.state.place,
                    user_name: user,
                    rating: this.state.rating,
                    comment: this.state.comment,
                    photo: this.state.image.base64,
                })
            })
            .then((response) => response.json())
            .then((response) => {
                if (response['result']=='202'){
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{name: 'MapScreen'}],
                    });
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    takePhoto() {
        if (this.state.first_visit) {
            if(this.state.proximity){
                let options={
                    mediaType: 'photo',
                    includeBase64: true,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    maxHeight: 300,
                    maxWidth: 400,
                }
                launchImageLibrary(options, (response) => {
                    // console.log(response);
                    if (response.didCancel) {
                        alert('User cancelled camera picker');
                        return;
                    } else if (response.errorCode == 'camera_unavailable') {
                        alert('Camera not available on device');
                        return;
                    } else if (response.errorCode == 'permission') {
                        alert('Permission not satisfied');
                        return;
                    } else if (response.errorCode == 'others') {
                        alert(response.errorMessage);
                        return;
                    }
                    this.setState({image:{uri: response.assets[0].uri, base64: response.assets[0].base64}});
                    let temp = response.assets[0].base64;
                    let temp2 = this.state.gallery
                    this.setState({gallery: temp2.push(temp)});
                    console.log(this.state.image.uri);
                });

                
                // if (!result.cancelled) {
                //     this.setState({image: {uri: result.uri, base64: result.base64}})
                // }
            } else {
                alert("Move closer to the site to upload a photo");

            }
        } else {
            alert("You cannot upload a photo after you have submitted a review");
        }
    }


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
            this.fetchReviews();
            let place_pos = {latitude: this.props.route.params.place.lat, longitude: this.props.route.params.place.lng};
            this.haversine_distance(initialPosition, place_pos);
            
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
                this.fetchReviews();
                let place_pos = {latitude: this.props.route.params.place.lat, longitude: this.props.route.params.place.lng};
                this.haversine_distance(initialPosition, place_pos);
                
            },
            error => alert(error.message),
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 10000}
        )      
    }

    haversine_distance(mk1, mk2) {
        console.log("User Location: ", mk1.latitude,mk1.longitude);
        console.log("Place Location: ", mk2.latitude,mk2.longitude);
        var R = 6371.0710; // Radius of the Earth in km
        var rlat1 = mk1.latitude * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.latitude * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.longitude-mk1.longitude) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        // return d;
        console.log("Distance: ", d);
        // alert(d);
        if (d<0.15) {

            this.setState({proximity:true});
        }
        
    }

    topSection() {
        if (this.state.gallery.length){
            return(
                <View>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        style={{}}
                    >
                        
                            {/* <View style={styles.imageContainer}>
                                <Image
                                    source={require('./img/placeholder.jpg')}
                                    style={styles.image}
                                    
                            />
                        

                            </View> */}
                        {this.state.gallery.map((gallery, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <Image
                                    source={{uri:`data:image/jpeg;base64,${gallery}`}}
                                    style={styles.image}
                                    
                                />
                            </View>
                        ))}
                    </Animated.ScrollView>
                    <View style={{paddingBottom:10, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {this.takePhoto()}}>
                            <View style={{flexDirection:'row'}}>  
                                <Icon 
                                    name='camera'
                                    size={30}
                                    color='#f05454'
                                />
                                <Text style={{paddingLeft: 20, color: '#f05454', fontSize: 22 }}>
                                    Upload a picture
                                </Text>                             
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
            )
        }

        else {
            return(
                <View>

                
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('./img/placeholder.jpg')}
                            style={styles.image}
                            
                        />
                        
        
                    </View>
                    <View style={{paddingBottom:10, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {this.takePhoto()}}>
                            <View style={{flexDirection:'row'}}>  
                                <Icon 
                                    name='camera'
                                    size={30}
                                    color='#f05454'
                                />
                                <Text style={{paddingLeft: 20, color: '#f05454', fontSize: 22 }}>
                                    Upload a picture
                                </Text>                             
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            paddingTop: 3,
                        }}
                    /> */}
                </View>
            )
        }
        
    }

    midSection() {
        console.log(this.state.user_reviews);
        if (this.state.user_reviews.length) {
            return(
                <View style={{flex:1,}}>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {this.state.user_reviews.map((user_reviews, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.textContent}>
                                    <Text>
                                        <Text style={styles.cardTitle} numberOfLines={1}>{user_reviews.user}</Text>
                                        {/* <Text style={styles.cardDescription}>Rating: {place.rating}</Text> */}
                                        <StarRating 
                                            rating={user_reviews.rating} 
                                            disabled={true}
                                            fullStarColor={'#FDF900'}
                                            emptyStarColor={'#BCBCBC'}
                                            starSize={15}
                                            containerStyle={{paddingLeft:20}}
                                        />
                                    </Text>
                                    
                                    <Text style={styles.textContent}>{user_reviews.comment}</Text>
                                    
                                </View>
                            </View>
                        ))}

                    </Animated.ScrollView>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            paddingTop: 3,
                        }}
                    />
                </View>
            )
        } else {
            
            return(
                <View style={{flex:0.5, }}>
                    <Text style={{color:'#fff', fontSize:23, paddingLeft: 10, paddingBottom: 30}}>No reviews have been submitted for this place</Text>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1,
                            paddingTop: 3,
                        }}
                    />
                </View>
                
            )
        }
    }

    bottomSection() {
        if (this.state.first_visit) {
            console.log("This is the user's first visit");
            // console.log(this.props.route.params.proximity);
            if (this.state.proximity) {
                
                return(
                    <View style={{flex:1}}>
                        <View>
                            <Text style={styles.text}>Give a rating and comment:</Text>
                            <View style={styles.starContainer}>
                                <StarRating
                                    disabled={false}
                                    fullStarColor={'#FDF900'}
                                    emptyStarColor={'#BCBCBC'}
                                    maxStars={5}
                                    selectedStar={(rating) => this.ratingHandler(rating)}
                                    rating={this.state.rating}
                                />
                            </View>
                            
                        </View>

                    
                        <TextInput 
                            style={styles.input}
                            multiline={true}                  
                            placeholderTextColor= '#FF3E00'
                            selectionColor = 'white'                  
                            maxLength={70}
                            autoCapitalize = "none"
                            onChangeText = {(val) => this.commentHandler(val)}
                        />
                        <TouchableOpacity
                            onPress = { () =>
                                this.submitReview()
                            }
                            style={{alignItems:'center'}}
                        >
                            <LinearGradient
                                colors={['#f05454','#FF1D1D']}
                                style={styles.buttonStyle}    
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return(
                    <View style={{flex:1}}>
                        <Text style={{color:'#fff', fontSize:23, paddingLeft: 10, paddingTop: 40,}}>
                            Approach the location to leave your review!
                        </Text>
                    </View>
                )
            }
        } else {
            return(
                <View style={{flex:1, }}>
                    <Text style={{color:'#fff', fontSize:25, padding:10}}>Your Review:</Text>
                    <Text style={{color:'#fff', fontSize:23, paddingLeft:10}}>Rating: 
                        <StarRating 
                            rating={this.state.rating} 
                            disabled={true}
                            fullStarColor={'#FDF900'}
                            emptyStarColor={'#BCBCBC'}
                            starSize={25}
                            containerStyle={{paddingLeft:20}}
                        />
                    </Text>
                    <Text style={{color:'#fff', fontSize:20, paddingLeft:10}}>{this.state.comment}</Text>
                </View>
            )
        }
    }

    componentDidMount() {
        // console.log(this.props.route.params.place.lat, this.props.route.params.place.lng);
        this.requestLocationPermission();
        // this.placeData();
        
    }

    // constructor(props) {
    //     super(props);
    //     const sheetRef = React.useRef(null);
    // }

    render() {
        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size={50} color='#E50D0D'/>
                  <Text style={{color:'#E50D0D', fontSize:26}}>Loading Location Details...</Text>
              </View>  
            );
        }

        

        return(
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{this.props.route.params.name}</Text>

                {/* <View style={styles.imageContainer}>
                    <Image
                        source={require('./img/placeholder.jpg')}
                        style={styles.image}
                        
                    />
                </View> */}

                <View style={{flex:1}}>
                    {this.topSection()}
                    
                    
                </View>

                <View style={{flex:1}}>
                    {this.midSection()}
                </View>
                
                <View style={{flex:1}}>
                    {this.bottomSection()}
                </View>
                
            </ScrollView>

        );
        
        
        
    }
}

export default PlaceScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#1C1E31',
    },
    innerText: {
        color: '#ffffff',
        flex: 1,
        paddingLeft: 10,
    },

 
    buttonStyle: {
        // flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#f05454',
        borderWidth: 1,
        // color: '#9dbeb7',
        borderColor: '#FF3E00',
        height: 60,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        marginBottom: 15,
    },
    title: {
        fontSize: 25,
        flex: 0.5,
        color: '#ffffff',
        // marginBottom: -160,
        // marginTop: 10,
        paddingLeft: 10,
        // justifyContent:'center',
        flex: 1,
    },
    text: {
        fontSize:25,
        color: '#ffffff',
        paddingLeft: 20,
    },
    buttonText: {
        fontSize: 25,
        color: '#ffffff',
    },
    input: {
        margin: 15,
        height: 60,
        color: 'white',
        backgroundColor: '#2F3454',
        borderColor: 'white',
        borderWidth: 1,
        paddingTop: 15,
    },
    description: {
        flex: 2,
        // flexWrap: 'wrap',
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
        borderColor: '#f05454',
        borderWidth: 1
    },
    image: {
        flex: 1,
        height: 250,
        width: 400,
        // borderRadius: 15,
        // borderColor: '#f05454',
        borderWidth: 1
    },
    imageContainer:{
        // alignContent: 'center',
        flex: 1.3,
        // paddingTop: -20,
        paddingBottom: 15,
        // marginBottom: -75,
        alignItems: 'center',
        justifyContent: 'center',

    },
    starContainer: {
        padding:10,
        // paddingTop:150,
        // paddingBottom: 35,
        flex: 0.5,
    },
    scrollView: {
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // right: 0,
        // paddingVertical: 10,
        // paddingTop: 100,
    },
    card: {
        // padding: 10,
        // paddingTop:100,
        elevation: 2,
        flex:1,
        // backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 120,
        width: width*0.6,
        overflow: "hidden",
        backgroundColor: '#2F3454',
        borderColor: 'white',
        borderWidth: 1,

    },
    textContent: {
        flex: 2,
        color: 'white',
        padding: 2,
        // paddingTop: 15,
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 17,
        // marginTop: 5,
        color: 'white',
        fontWeight: "bold",
    },
});
