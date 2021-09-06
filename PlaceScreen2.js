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
  Animated,
  ActivityIndicator
} from 'react-native';

import Header from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        isLoading: true,
    }
    
    async placeData() {
        try {
            const temp1 = await AsyncStorage.getItem('place_id');
            const temp2 = await AsyncStorage.getItem('place_name');
            const temp3 = await AsyncStorage.getItem('place_lat');
            const temp4 = await AsyncStorage.getItem('place_lng');
            const temp5 = await AsyncStorage.getItem('place_rating');
            if (temp1 !== null) {
                this.setState({place: {
                    id: temp1,
                    name: temp2,
                    lat: temp3,
                    lng: temp4,
                    rating: temp5,
                }});
                this.fetchReviews();
            } else {
                console.log('Place details were not saved');
            }
        } catch (e) {
            console.log('Failed to fetch the data from storage');
        }
    }

    async fetchReviews() {
        const place_id = this.state.place['id']
        fetch('http://10.0.2.2:5000/reviews', {
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
        .then((response) => 
            response.json())
        .then((response) => {
        //    if (response['result']==202){
        //         console.log(response);
        //         const temp = [];
        //         for (var item in response['data']) {
        //             temp.push({"user": response['data'][item]["user"], "rating": response['data'][item]["rating"], 
        //             "comment": response['data'][item]['comment']});
                
        //         }
        //         this.setState({user_reviews: temp});
        //         console.log(this.state.user_reviews);
        //     } else {
        //         console.log('No reviews registered for this place');
        //    }
            console.log(response);
            var temp = [];
            for (var item in response) {
                temp.push({'user': response[item][4], 'rating': response[item][3], 'comment': response[item][2]});
            }
            this.setState({user_reviews: temp});
            this.setState({isLoading: false});
        })
            // console.log(response))               
        .catch((error) => console.log(error));
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
            await fetch('http://10.0.2.2:5000/review', {  
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

    componentDidMount() {
        console.log(this.props.route.params.place.name);
        this.placeData();
        
    }

    render() {

        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size={50} color='#E50D0D'/>
              </View>  
            );
        }
        
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{this.state.place.name}</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('./img/placeholder.jpg')}
                        style={styles.image}
                        
                    />
                </View>
                    
                <View style={{flex:1}}>
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
                </View>
                <View style={{flex:1}}>

                    <Text style={styles.title}>Approach the location to leave a review!</Text>
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
        height: 350,
        width: 400,
        // borderRadius: 15,
        // borderColor: '#f05454',
        borderWidth: 1
    },
    imageContainer:{
        // alignContent: 'center',
        flex: 2,
        // paddingTop: -20,
        paddingBottom: 150,
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
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        // padding: 10,
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
