/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {Thumbnail } from 'native-base';

import NewsFeed from './components/NewsFeed';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecoverPassword from "./components/RecoverPassword";
import ItemNewsFeed from './components/ItemNewsFeed';
import Calendar from './components/Calendar'
import VideoMenu from './components/VideoMenu';
import VideoTechnique from './components/VideoTecnica';
import Rules from './components/Rules';
import Refereeing from './components/Refereeing';
import Poomse from './components/Poomse';
import SpecificPumse from './components/SpecificPumse'
import RefereeingInfo from './components/RefereeingInfo'
import RefereeingCategory from './components/RefereeingCategory'
import RefereeingItem from './components/RefereeingItem'


import {
    StyleSheet,
    AsyncStorage,
} from 'react-native';

import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';

import { Left, Button, Icon } from 'native-base';

type Props = {};

export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = { hasToken: false, isLoaded: false };
        console.disableYellowBox = true;
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

export const StackTraining = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
        
    },
    RecoverPassword: {
        screen: RecoverPassword
    },
    SignUp: {
        screen: SignUp
    },
});

export const StackNewsFeed = StackNavigator({
    NewsFeed:{
        screen:NewsFeed,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })       
    },
    ItemNewsFeed:{
        screen:ItemNewsFeed
    }
});

export const StackCalendar = StackNavigator({
    Calendar: {
        screen: Calendar,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});


export const StackVideo = StackNavigator({
    VideoMenu: {
        screen: VideoMenu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
    VideoTechnique:{
        screen:VideoTechnique
    }
});

export const StackRules = StackNavigator({
    Rules: {
        screen: Rules,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
});

export const StackPumse = StackNavigator({
    Pumse: {
        screen: Poomse,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
        })
    },
    SpecificPumse: {
        screen: SpecificPumse
    },
});

export const StackRefereeing = StackNavigator({
	Refereeing: {
        screen: Refereeing,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
          })
    },
    RefereeingInfo:{
	    screen: RefereeingInfo
    },
    RefereeingCategory:{
	    screen:RefereeingCategory
    },
    RefereeingItem:{
	    screen:RefereeingItem
    }
});

const DrawerStack = DrawerNavigator({
    NewsFeed: { screen: StackNewsFeed },
    Calendar: { screen: StackCalendar},
    Video: { screen: StackVideo},
    Pumse : {screen: StackPumse},
    Rules: { screen: StackRules},
    Refereeing: { screen: StackRefereeing},
    Training: { screen: StackTraining }
});

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
