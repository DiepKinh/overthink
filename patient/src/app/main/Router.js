import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import ListScreen from './screens/ListScreen';
import UserScreen from './screens/UserScreen';

export const appStackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  BookScreen: {
    screen: BookScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ListScreen: {
    screen: ListScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserScreen: {
    screen: UserScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(appStackNavigator);
