import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'react-native-vector-icons/Ionicons';

export default function Header() {
    return(
        <View style={styles.header}>
            <Icon 
                name='menu'
                size={30}
                onPress={console.log('menu')}
            />
            <View>
                <Text style={styles.headerText}>
                    User
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height:'100%',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f05454'
    },
    headerText:{
        fontWeight:'bold',
        fontSize:20,
        color:"#333",
        letterSpacing:1,
    },

});