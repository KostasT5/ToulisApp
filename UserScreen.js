import * as React from 'react';
import {useState, setState, useEffect} from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, 
    Platform, TouchableOpacity, FlatList, ActivityIndicator, ScrollView, 
    Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';


const { width, height } = Dimensions.get("window");


class UserScreen extends React.Component{
    // const [history,setHistory] = useState(
   
    // );

    // const [user, setUser] = useState('');

    // useEffect(() => {
    //     readData();
    //     fetchHistory();
    // });

    state = {
        history: null,
        user: null,
        isLoading: true
    }
    
    async readData() {
        console.log('Read username');
        try {
            const username = await AsyncStorage.getItem('user_name');
        
            if (username !== null) {
                // setUser(username);
                this.setState({user: username});
                this.fetchHistory();
            } else {
                console.log('USername not set');
            }
        } catch (e) {
            console.log('Failed to fetch the data from storage');
        }
    }

    async fetchHistory() {
        try{
            await fetch('http://10.0.2.2:5000/history', {  
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
                console.log(response);
                // setHistory(response);
                this.setState({history:response});
                this.setState({isLoading: false})
            })
        } catch (e) {
            console.log(e)
        }
    }
    
    componentDidMount() {
        this.readData();
        // this.fetchHistory();
    }

    render() {
        if (this.state.isLoading){
            return(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <ActivityIndicator size={50} color='#E50D0D'/>
              </View>  
            );
        }

        return (
            <View style={ styles.container }>
                <Text style={styles.title}>Welcome {this.state.user}</Text>
                <Text style={styles.title2}>History</Text>
                <FlatList
                    style={styles.list}
                    data={this.state.history}
                    renderItem={({item}) => (
                        <View key={item[0]}>
                            <Text style={styles.item}>{item[0]}</Text>
                            <Text style={{color: '#ffffff', flex: 1, fontSize: 23, paddingBottom: 5,}}>
                                Date: {item[1]}
                                <StarRating 
                                    rating={parseInt(item[2])} 
                                    disabled={true}
                                    fullStarColor={'#FDF900'}
                                    emptyStarColor={'#BCBCBC'}
                                    starSize={20}
                                    containerStyle={{paddingLeft:30, paddingRight:30}}
                                />
                            </Text>
                            <Text style={styles.innerText}>{item[3]}</Text>
                            <View
                                style={{
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                    paddingTop: 3,
                                }}
                            />
                        </View>
                    )}
                />
            </View>
        );
    }
    
}

export default UserScreen

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
        flex: 1,
        fontSize: 18
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
    title2: {
        fontSize: 30,
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