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
    StyleSheet,
    AsyncStorage,
} from 'react-native';

import {
    StackNavigator,
    DrawerNavigator
} from 'react-navigation';

export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token').then((token) => {
            this.setState({ hasToken: token !== null, isLoaded: true })
        });
    }

  render() {
      return <DrawerStack/>;
  }
}

export const StackLogin = StackNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
});

export const StackFeeds = StackNavigator({
    Feeds:{
        screen:Feeds
    },
    ItemFeed:{
        screen:ItemFeed
    }
});

export const StackCalendar = StackNavigator({
    Calendar: {
        screen: Calendar
    },
});


export const StackVideo = StackNavigator({
	Video: {
        screen: Video
    },
});

export const StackRules = StackNavigator({
	Rules: {
        screen: Rules
    },
});

export const StackArbitraje = StackNavigator({
	Refereeing: {
        screen: Arbitraje
    },
});

const DrawerStack = DrawerNavigator({
    Novedades: { screen: StackFeeds },
    Calendar: { screen: StackCalendar},
    Video: { screen: StackVideo},
    Rules: { screen: StackRules},
    Refereeing: { screen: StackArbitraje},
    Entrenamiento: { screen: StackLogin }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
