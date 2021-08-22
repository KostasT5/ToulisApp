import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { bold } from 'ansi-colors';
import Icon from 'react-native-vector-icons/FontAwesome5'


export default function DrawerContent(props) {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                            <Avatar.Image
                                source = {{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                                }}
                                size = {50}
                            />
                            <View style={{marginLeft:15}}>
                                <Title style={styles.title}>User Name</Title>
                            </View>
                            
                        </View>
                        
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={(color, size) => (
                                <Icon 
                                    name='map' 
                                    color={'#8C8C8C'}

                                    size={30}
                                />
                            )}
                            label="Map"
                            onPress={() => {props.navigation.navigate('Map')}}
                            
                        />
                        <DrawerItem 
                            icon={(color, size) => (
                                <Icon 
                                    name='user' 
                                    color={'#8C8C8C'}

                                    size={30}
                                />
                            )}
                            label="User"
                            onPress={() => {props.navigation.navigate('User')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={(color, size) => (
                        <Icon 
                            name='sign-out-alt' 
                            color={'#8C8C8C'}

                            size={30}
                        />
                    )}
                    label="Sign out"
                    onPress={() => {}}
                />
            </Drawer.Section>
            
        </View>
    );
}

const styles = StyleSheet.create({

    drawerContent:{
        flex:1
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
    },
    section:{
        flexDirection: 'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3,
    },
    drawerSection:{
        marginTop:15,
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:'#f4f4f4',
        borderTopWidth:1,
    },
    preference:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:15
    }


});