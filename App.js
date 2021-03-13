/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import 'react-native-gesture-handler';
// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import { NavigationContainer } from '@react-navigation/native';

// const App: () => React$Node = () => {
//   return (
//     <>
//     <NavigationContainer>
//       <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <ScrollView
//             contentInsetAdjustmentBehavior="automatic"
//             style={styles.scrollView}>
//             <Header />
//             {global.HermesInternal == null ? null : (
//               <View style={styles.engine}>
//                 <Text style={styles.footer}>Engine: Hermes</Text>
//               </View>
//             )}
//             <View style={styles.body}>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Step One</Text>
//                 <Text style={styles.sectionDescription}>
//                   Edit <Text style={styles.highlight}>App.js</Text> to change this
//                   screen and then come back to see your edits.
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>See Your Changes</Text>
//                 <Text style={styles.sectionDescription}>
//                   <ReloadInstructions />
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Debug</Text>
//                 <Text style={styles.sectionDescription}>
//                   <DebugInstructions />
//                 </Text>
//               </View>
//               <View style={styles.sectionContainer}>
//                 <Text style={styles.sectionTitle}>Learn More</Text>
//                 <Text style={styles.sectionDescription}>
//                   Read the docs to discover what to do next:
//                 </Text>
//               </View>
//               <LearnMoreLinks />
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </NavigationContainer>
      
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;



// 'use strict';



import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
// import Tab_icons from './img';
// import Icon from 'react-native-vector-icons/Ionicons'; 

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function UserScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

class MapScreen extends React.Component{

  state = {
    coordinates: [
      {name: 'Patras', latitude: 38.246550, longitude: 21.734669},
    ]
  }

  requestLocationPermission = async () => {
    if(Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      
      if(response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {

    }
  }


  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }

        this.setState({initialPosition});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    )
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
    
      <MapView 
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        ref={map => this._map = map}
        style={styles.map}
        initialRegion={this.state.initialPosition}>
        <Marker
          coordinate={{latitude: 38.246550, longitude: 21.734669}}
          // coordinate={this.state.initialPosition.latitude, this.state.initialPosition.longitude}
          title={'Position'}
        >
          {/* <Callout>
            <Image 
              source={require('./img/Map_Icons/chat.png')} 
              style={styles.map_image}
            />
            <Text>You are here</Text>
          </Callout> */}
            {/* <Image 
              source={require('./img/Map_Icons/chat.png')} 
              style={styles.map_image}
            /> */}
        </Marker>
      </MapView>
      
  
    );
  }
  
}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#FFFFFF"
        inactiveColor="#B5B2B8"
        barStyle={{ 
          backgroundColor: '#2D068E',
          height: 55,
          // paddingBottom: 10
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',

            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require('./img/Tab_icons/home.png')}
                style={[styles.icon, {tintColor: '#c4c4c4'}]} />
            )
          }} 
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require('./img/Tab_icons/placeholder.png')}
                style={[styles.icon, {tintColor: '#c4c4c4'}]} />
            )
          }} 
        />
        <Tab.Screen 
          name="User" 
          component={UserScreen} 
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({tintColor }) => (
              <Image
                source={require('./img/Tab_icons/user.png')}
                style={[styles.icon, {tintColor: '#c4c4c4'}]} />
            )
          }} 
        />
      <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            tabBarLabel: 'Settings',
            tabBarOptions: {
              // activeTintColor: '#FF2300',
              inactiveTintColor: '#ffffff'
      
          },
            tabBarIcon: ({tintColor}) => (
              <Image
                // color={tintColor}
                source={require('./img/Tab_icons/settings.png')}
                style={[styles.icon, {tintColor: '#c4c4c4'}
              ]} />
            ),

          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
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
  }
});
