/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
import RefereeingInfo from './components/RefereeingInfo'
import RefereeingCategory from './components/RefereeingCategory'
import RefereeingItem from './components/RefereeingItem'
import SpecificPumse from './components/SpecificPumse';
import Trainings from './components/Trainings';
import Training from './components/Training';
import CreateTraining from './components/CreateTraining';
import RegisterMeasurements from './components/RegisterMeasurements';

import {
    StyleSheet,
    AsyncStorage,
    Image,
    ScrollView
} from 'react-native';

import { Container, Content, Icon, Header, Body, Left, Button, Text } from 'native-base'
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation'

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
    Trainings:{
        screen: Trainings
    },
    Training:{
        screen: Training
    },
    RegisterMeasurements: {
        screen: RegisterMeasurements,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <MenuButton navigation={navigation} />,
        })
    },
    CreateTraining:{
        screen: CreateTraining
    }
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

const CustomDrawerContentComponent = (props) => (

    <Container>
        <Header style={styles.drawerHeader}>
            <Body style={{flex:1}}>
            <Left style={{alignSelf:"center",justifyContent:"center"}}>
                <Image
                    source={require('./components/img/poomse1.png')}
                    style={styles.iconMenu}
                />
            </Left>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>

    </Container>

);
const DrawerStack = DrawerNavigator({
    NewsFeed: { screen: StackNewsFeed },
    Calendar: { screen: StackCalendar},
    Video: { screen: StackVideo},
    Pumse : {screen: StackPumse},
    Rules: { screen: StackRules},
    Refereeing: { screen: StackRefereeing},
    Training: { screen: StackTraining },
},
{
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    drawerHeader: {
        height: 200,
        backgroundColor: '#af4c3a'
    },
    drawerImage: {
        height: 140,
        width: 200,
        alignItems:'center',
    },
    iconMenu: {
       width:100,
       height:100
    }
});

export const MenuButton = (props) => {
    return (
        <Left>
            <Button transparent onPress={() => {props.navigation.navigate('DrawerOpen'); } }>
                <Icon name='menu' type="MaterialIcons"/>
            </Button>
        </Left>
    );
}
