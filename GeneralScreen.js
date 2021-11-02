// import * as React from 'react';
import React, {Component, useState, setState, useEffect} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import SettingsScreen from './settings.js'
import LinearGradient from 'react-native-linear-gradient'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './registerpage.js'
import StartingScreen from './loginorregister.js'
import StarRating from 'react-native-star-rating';
import MapScreen from './MapScreen.js';
import UserScreen from './UserScreen.js';
import SettingsScreen from './SettingsScreen.js';
import DrawerContent from './DrawerContent.js';
import PlaceScreen from './PlaceScreen.js';
import MapStackScreen from './MapStackScreen.js';
import { getHeaderTitle } from '@react-navigation/elements';

import { Header } from './Header.js';

import Icon from 'react-native-vector-icons/Ionicons'
import TestScreen from './TestScreen.js';
// import { getHeaderTitle } from '@react-navigation/elements';

// import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'

// import User from './UserScreen.js'
// import apiKey from './google_api_key.txt'

const { width, height } = Dimensions.get("window");


  

const Tab = createMaterialBottomTabNavigator();

// const Drawer = createDrawerNavigator();


export default class App extends React.Component{

    constructor(props) {
        super(props);
        // this.handlePlace = this.handlePlace.bind(this);
        this.state.user = this.props.route.params.user;
    }
    
    state = {
        latitude: '',
        longitude: '',
        places: [],
        history: [],
        isLoading: true,
        user:'',
    }


    async fetchHistory() {
        console.log("Fetching history for:", this.state.user);
        try{
            await fetch('https://toulis-thesis.herokuapp.com/history', {  
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    AcceptLanguage: '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({    
                    user_name: this.state.user,                
                })
            })
            .then((response) => response.json())
            .then((response) => {
                // if (response['result']=='202'){
                    // setHistory(response['history']);
                // }
                // console.log("RESPONSE: ",response);
                // setHistory(response);
                let temp = []
                for (let i in response) {
                    temp.push({"name":response[i][5], "date": response[i][6], "rating": response[i][3], "comment":response[i][2], "photo":response[i][7]})
                }
                this.setState({history:temp});
                console.log("History: ", this.state.history);
                this.setState({isLoading: false})
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        // this.requestLocationPermission();
        this.props.navigation;
        // this.setState({user: this.props.route.params.user});
        // console.log("GS ",this.state.user);
        this.fetchHistory();
        for (let i=0; i<this.state.history.length; i++) {
            console.log(this.state.history[i].name);
        }
    }

    
    render() {
        console.log("USER: ",this.state.user);
        console.log("HISTORY: ",this.state.history);
        if (this.state.isLoading) {
            return(
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size={50} color='#E50D0D'/>
                    <Text style={{color:'#E50D0D', fontSize:26}}>Fetching your history...</Text>
                </View>  
              );
        }
        return (

            // <NavigationContainer 
            //     independent={true}
            // >
            //     <Drawer.Navigator 
            //         drawerContent={props => <DrawerContent {...props}/>}
            //         edgeWidth={50}
            //         defaultStatus='open'
            //         initialRouteName='User'
            //         drawerStyle={{
            //             backgroundColor:'#1C1E31'
            //         }}
            //         screenOptions={{
            //             // headerTitle: () => <Header />,
            //             headerShown:false,
            //         }}
                    
            //     >
            //         <Drawer.Screen 
            //             name="Map" 
            //             component={MapScreen} 
            //             options={{
            //                 title:"Map",
                            
            //             }}
                        
            //         />
            //         <Drawer.Screen 
            //             name="User" 
            //             component={UserScreen}
                        
            //         />
            //     </Drawer.Navigator>
            // </NavigationContainer>
            <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName="User"
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
                    name="Map" 
                    component={MapStackScreen} 
                    // children={() => <UserScreen available_time = {this.state.time} /> }
                    initialParams = {{user: this.state.user, history: this.state.history}}
                    options={{
                        tabBarLabel: 'Map',
                        
                        tabBarIcon: ({ color }) => (
                        // <Image
                        //     source={require('./img/Tab_icons/placeholder.png')}
                        //     style={[styles.icon, {tintColor: '#c4c4c4'}]} />
                            <Icon 
                                name='map'
                                color={color}
                                size={25}
                            />
                        )
                    }} 
                />
                <Tab.Screen 
                    name="User" 
                    component={UserScreen} 
                    initialParams = {{user: this.state.user, history: this.state.history}}
                    options={{
                        tabBarLabel: 'User',
                        tabBarIcon: ({color }) => (
                            <Icon 
                                name='person'
                                color={color}
                                size={25}
                            />
                        )
                    }} 
                />
                <Tab.Screen 
                    name="Settings"  
                    component={SettingsScreen}
                 
                    options={{
                        tabBarLabel: 'Settings',
        
                        tabBarIcon: ({ color }) => (
                            <Icon 
                                name='md-settings-sharp'
                                color={color}
                                size={25}
                            />
                        )
                    }} 
                />
            </Tab.Navigator>
            </NavigationContainer>
        );

    }

}

// class HomeScreen extends React.Component{
//     state = {
//         latitude: '',
//         longitude: '',
//         places: []      
//     }


//     componentDidMount() {
//         this.props.navigation;
//     }

//     render(){
//         return (
//             <View style={styles.container}>
              
//               <Text style={styles.title}>Places near you:</Text>
//               <FlatList
//                   style={styles.list}
//                   data={this.state.places}
//                   renderItem={({item}) => (
//                       <View>
//                           <Text style={styles.item} key={item.id}>{item.name}</Text>     
//                       </View>
//                   )}
//               />
//             </View>
//           );
//     }
    
// }



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
  