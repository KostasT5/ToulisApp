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
  Animated
} from 'react-native';

import Header from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from 'react-native-star-rating';


const { width, height } = Dimensions.get("window");

class PlaceScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        rating: 0,
        comment: '',
        user_comments: [{'user':'User 1', 'rating': 4, 'comment':'Lorem ipsum dolor sit amet,'},
        {'user':'User 2', 'rating': 5, 'comment':'Lorem ipsum dolor sit amet,'},
        {'user':'User 3', 'rating': 3, 'comment':'Lorem ipsum dolor sit amet,'}
        ],
    }
    // const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    // const [comments, setComments] = useState([
    //     {user: 'User 1', key: '1', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 2', key: '2', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 3', key: '3', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 4', key: '4', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 5', key: '5', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 6', key: '6', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 7', key: '7', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 8', key: '8', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},  
    //     {user: 'User 9', key: '9', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 10', key: '10', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 11', key: '11', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 12', key: '12', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 13', key: '13', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 14', key: '14', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 15', key: '15', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    //     {user: 'User 16', key: '16', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},  
    // ]);

    // const [rating, setRating] = useState(0);
    
    ratingHandler(val){
        this.setState({rating: val});
        console.log(this.state.rating);
    }

    commentHandler = (val) => {
        this.setState({comment: val});
    }

    // const [comment, setComment] = useState('');

    // const commentHandler = (val) => {
    //     setComment(val);
    // }
    // const submitHandler = () => {
    //     console.log(comment);
    // }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Place Name</Text>

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
                        {this.state.user_comments.map((user_comments, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.textContent}>
                                    <Text style={styles.cardTitle} numberOfLines={1}>{user_comments.user}</Text>
                                    {/* <Text style={styles.cardDescription}>Rating: {place.rating}</Text> */}
                                    <StarRating 
                                        rating={user_comments.rating} 
                                        disabled={true}
                                        fullStarColor={'#FDF900'}
                                        emptyStarColor={'#BCBCBC'}
                                        starSize={20}
                                    />
                                    <Text style={styles.textContent}>{user_comments.comment}</Text>
                                    
                                </View>
                            </View>
                        ))}

                    </Animated.ScrollView>
                </View>
                <View style={{flex:1}}>

                    <View>
                        <Text style={styles.title}>Give a rating:</Text>
                        <View style={styles.starContainer}>
                            <StarRating
                                disabled={false}
                                fullStarColor={'#FDF900'}
                                emptyStarColor={'#BCBCBC'}
                                maxStars={5}
                                
                                selectedStar={(rating) => this.ratingHandler(rating)}
                                rating={this.state.rating}
                                // onPress={ratingHandler(1)}
                                // starSize = {30}
                            />
                        </View>
                        
                    </View>

                    <Text style={styles.title}>Add an interesting comment:</Text>
                    <TextInput 
                        style={styles.input}
                        multiline={true}
                        // placeholder = "Password"
                        // placeholderTextColor = "#9a73ef"
                        placeholderTextColor= '#FF3E00'
                        selectionColor = 'white'
                        // secureTextEntry={true}
                        maxLength={50}
                        autoCapitalize = "none"
                        onChangeText = {this.commentHandler}
                    />
                    <TouchableOpacity
                    // style = {styles.submitButton}
                    // onPress = {
                    //     submitHandler
                    // }
                    >
                        <LinearGradient
                            colors={['#f05454','#FF1D1D']}
                            style={styles.buttonStyle}    
                        >
                        <Text style={styles.buttonText}>Submit</Text>
                    </LinearGradient>
                </TouchableOpacity>
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
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222831'
    },
    // logo: {
    //     width: 0.5*height,
    //     height: 0.5*height,
    //     flex: 1,
    // },
    innerText: {
        color: '#ffffff',
        flex: 1,
        paddingLeft: 10,
    },
    footer: {
        flex: 1,
        // flexWrap: 'wrap',
        borderWidth: 1,
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        // justifyContent: 'space-between',
        backgroundColor: '#222831',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    buttonContainer:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#222831',
        marginTop: 40,
        marginLeft: -20,
        marginRight: -20,
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
    title: {
        fontSize: 25,
        // flex: 1,
        color: '#ffffff',
        // marginBottom: -130,
        marginTop: 10,
        paddingLeft: 10,
        // justifyContent:'center',
        flex: 1,
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffff',
    },
    input: {
        margin: 15,
        height: 50,
        color: 'white',
        backgroundColor: '#2F3454',
        // borderColor: '#7a42f4',
        // placeholderTextColor: '#C22F00',
        borderColor: 'white',
        borderWidth: 1
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
        flex: 1.5,
        paddingTop: 20,
        paddingBottom: 150,
        // marginBottom: -150,
        alignItems: 'center',
        justifyContent: 'center',

    },
    starContainer: {
        padding:10,
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
        // backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 120,
        width: width*0.5,
        overflow: "hidden",
        backgroundColor: '#2F3454',
        borderColor: 'white',
        borderWidth: 1,
    },
    textContent: {
        flex: 2,
        color: 'white',
        padding: 10,
    },
    cardTitle: {
        fontSize: 17,
        // marginTop: 5,
        color: 'white',
        fontWeight: "bold",
    },
});
