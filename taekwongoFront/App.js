/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Feeds from './components/Feeds'
import Login from './components/Login'
import Screen1 from './components/Screen1'
import Screen2 from './components/Screen2'
import SignUp from './components/SignUp'

import {
  Platform,
  StyleSheet,
  Text,
  View,
    TextInput,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {
    StackNavigator,
    SwitchNavigator,
    DrawerNavigator
} from 'react-navigation';

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
        navigationOptions: {
            title: "Login"
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "SignUp"
        }
    },
});

const DrawerStack = DrawerNavigator({
    Home:
        { screen: StackLogin
        },
    Novedades: { screen: Screen2 }
})

/*

 */

/*
return(
              <Router>
                  <Scene key='root'>
                      <Scene
                          component={SignUp}
                          initial={!this.state.hasToken}
                      />
                      <Scene
                          component={SignUp}
                          initial={this.state.hasToken}
                      />
                 </Scene>
              </Router>
      )
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


