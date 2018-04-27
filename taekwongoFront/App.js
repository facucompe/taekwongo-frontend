/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Feeds from './components/Feeds'
import Login from './components/Login'
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
    SwitchNavigator
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
      this.componentDidMount()
      const Layout = createRootNavigator(this.state.hasToken);
      return <Layout/>;
  }
}


export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            Login:{
                screen: Login
            },
            SignUp: {
                screen: SignUp
            },
        },
        {
            initialRouteName: signedIn ? "Home" : "Login"
        }
    );
};

export const stackLogin = StackNavigator({
    SignUp: {
        screen: SignUp
    },
});

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


