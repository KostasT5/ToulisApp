import React, {useState, useEffect, Component} from 'react';
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
} from 'react-native';

import Header from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'


const PlaceScreen = ({navigation}) => {
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    const [comments, setComments] = useState([
        {user: 'User 1', key: '1', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 2', key: '2', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 3', key: '3', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 4', key: '4', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 5', key: '5', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 6', key: '6', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 7', key: '7', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 8', key: '8', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},  
        {user: 'User 9', key: '9', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 10', key: '10', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 11', key: '11', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 12', key: '12', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 13', key: '13', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 14', key: '14', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 15', key: '15', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {user: 'User 16', key: '16', comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},  
    ]);
    
    const [comment, setComment] = useState('');

    const commentHandler = (val) => {
        setComment(val);
    }
    const submitHandler = () => {
        console.log(comment);
    }
    return(
        <ScrollView style={styles.container}>
            {/* <Header
                centerComponent={{text:'Place', style:{color: '#fffff'}}}

                containerStyle={{
                    backgroundColor:'#30475e',
                    justifyContent:'center',
                }}
            /> */}
            <Text style={styles.title}>Place</Text>
            <View style={styles.description}>
                {/* <Text style={styles.title}>Place</Text> */}
                {/* <Text style={styles.innerText}> {description} </Text>
                 */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./img/placeholder.jpg')}
                        style={styles.image}
                    />
                </View>
                
                <Text style={styles.innerText}>{description}</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.title}>Add a comment:</Text>
                <TextInput 
                    style={styles.input}
                    multiline={true}
                    // placeholder = "Password"
                    // placeholderTextColor = "#9a73ef"
                    placeholderTextColor= '#FF3E00'
                    selectionColor = 'white'
                    // secureTextEntry={true}
                    autoCapitalize = "none"
                    onChangeText = {commentHandler}
                />
                <TouchableOpacity
                // style = {styles.submitButton}
                onPress = {
                    submitHandler
                }>
                <LinearGradient
                    colors={['#f05454','#FF1D1D']}
                    style={styles.buttonStyle}    
                >
                  <Text style={styles.buttonText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.title}>Comments by users:</Text>
                <FlatList
                    style={styles.list}
                    data={comments}
                    renderItem={({item}) => (
                        <View>
                            <Text style={styles.item}>{item.user}</Text>
                            <Text style={styles.innerText}>{item.comment}</Text>
                        </View>
                    )}
                />
            </View>
            
            
        </ScrollView>

    );
}

export default PlaceScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#222831',
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
        color: '#ffffff',
        // marginBottom: 30,
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
        height: 120,
        color: 'white',
        backgroundColor: '#30475e',
        // borderColor: '#7a42f4',
        // placeholderTextColor: '#C22F00',
        borderColor: '#f05454',
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
        width: 250,
        borderRadius: 15,
        borderColor: '#f05454',
        borderWidth: 1
    },
    imageContainer:{
        // alignContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
});
