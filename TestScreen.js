import React, {Component, useState, setState, useEffect} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Animated, Dimensions, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Chip } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';


const { width, height } = Dimensions.get("window");

export default function TestScreen() { 
    const [path, setPath] = useState();

    return(
        // style={{position:'absolute', top:10, flexDirection:'row', flexWrap:'wrap'}}
        // <View style={{backgroundColor:'grey'}}>
            <View style={{position:'absolute', top:10, backgroundColor: 'rgba(9, 0, 92, 0.5)', borderRadius: 10}}>
                <Text style={{fontSize:25, paddingLeft:10, paddingTop: 5, fontWeight:'bold', color: 'white'}}>Pick a path:</Text>
                <Picker
                    selectedValue="tourist attraction"
                    mode='dropdown'
                    prompt='Pick a path:'
                    style={{width: width*0.6, height: 50}}
                    itemStyle={{
                        color:'red',
                        fontSize: 22,

                    }}
                    style={{
                        // backgroundColor: 'rgba(9, 0, 92, 0.5)',
                        width: width*0.6,
                        height: height*0.1,
                        fontSize: 22,
                    }}
                >
                    <Picker.Item label="Tourist Attractions" value="tourist attraction" color="white"/>
                    <Picker.Item label="Museums" value="museum" color="white"/>
                    <Picker.Item label="Churches" value="church" color="white"/>
                    <Picker.Item label="Parks & Squares" value="park" color="white"/>
                </Picker>
            </View>
        // </View>
        
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
        backgroundColor: 'white',
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
        fontSize: 20,
        // marginTop: 5,
        fontWeight: "bold",
        color: 'white',
    },
    cardDescription: {
        fontSize: 19,
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
    cardRating:{
        fontSize: 19,
        color: "#f05454",
        flex: 1,
    },
});