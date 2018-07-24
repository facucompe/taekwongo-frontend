/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Feeds from './components/Feeds'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ItemFeed from './components/ItemFeed'
import Calendar from './components/Calendar'
import Video from './components/Video'
import Rules from './components/Rules'
import Arbitraje from './components/Arbitraje'

import {
  Platform,
  StyleSheet,
  Text,
  View,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';

import {
    StackNavigator,
    SwitchNavigator,
    DrawerNavigator,
    NavigationActions
} from 'react-navigation';

import { Container, Header, Left, Body, Button, Icon, Title } from 'native-base';

import {Router, Scene} from 'react-native-router-flux'

type Props = {};

export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }

    componentDidMount() {
        AsyncStorage.getItem('id_token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
        });
    }

  render() {
      return <DrawerStack/>;
  }
}
export const StackLogin = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
        
    },
    SignUp: {
        screen: SignUp
    },
});

export const StackFeeds = StackNavigator({
    Feeds:{
        screen:Feeds,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })       
    },
    ItemFeed:{
        screen:ItemFeed
    }
})

export const StackCalendar = StackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});


export const StackVideo = StackNavigator({
    Video: {
        screen: Video,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});

export const StackRules = StackNavigator({
    Rules: {
        screen: Rules,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});

export const StackArbitraje = StackNavigator({
    Arbitraje: {
        screen: Arbitraje,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});

const DrawerStack = DrawerNavigator({
    Novedades: { screen: StackFeeds },
    Calendar: { screen: StackCalendar},
    Video: { screen: StackVideo},
    Reglamento: { screen: StackRules},
    Arbitraje: { screen: StackArbitraje},
    Entrenamiento: { screen: StackLogin }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export const MenuButton = (props) => {
    return (
        <Left>
            <Button transparent onPress={() => {props.navigation.navigate('DrawerOpen'); } }>
                <Icon name='menu' />
            </Button>
        </Left>
    );
}
