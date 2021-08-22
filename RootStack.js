import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from './SplashScreen.js'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './RegisterScreen.js'
import GeneralScreen from './GeneralScreen.js'
import PlaceScreen from './PlaceScreen.js'

const screens = {
    Splash: {
        screen: SplashScreen
    },
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
    General: {
        screen: GeneralScreen
    },
    Place: {
        screen: PlaceScreen
    }
}

const RootStack = createStackNavigator(screens);

export default RootStack;