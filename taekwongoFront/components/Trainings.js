import React, {Component} from "react";
import {Button, Col, Container, Content, Footer, Grid, Icon, List, ListItem, Left, Right, Row, Text} from "native-base";

import {AsyncStorage, StyleSheet, ScrollView, RefreshControl,Image } from "react-native";

import Training from "./Training";
import Login from "./Login";

import moment from "moment";
import {iconNameFor} from "./Commons";
import {NavigationActions} from 'react-navigation'

export default class Trainings extends Component {

    static navigationOptions = {
        title: 'Entrenamientos',
        drawerLabel: 'Entrenamiento',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/entrenamiento.png')}
                style={styles.icon}
            />
        ),
    };

    constructor(props){
        super(props);

        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            refreshing: false,
            trainings: []
        };

        this.openCreateTrainingView = this.openCreateTrainingView.bind(this);
        this.moveTo = this.moveTo.bind(this);
        this.signOut = this.signOut.bind(this);
        this.goBackToLogin = this.goBackToLogin.bind(this);

    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        return fetch('http://taekwongo.herokuapp.com/trainings',
        {
            method: 'GET',
            headers: {
                authorization: this.session_token
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({trainings: response});
        })
        .catch(error => {
            alert('Error de conexión, intente nuevamente');
            console.log('Error en el el fetch: ' + error.message);
        });
    }

    onTrainingRefresh = () => {
        this.setState({refreshing: true});
        this.fetchData().then(() => {
          this.setState({refreshing: false});
        });
      }

    render() {
        return (
            <Container style={styles.container}>
                <ScrollView
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onTrainingRefresh}
                            colors ={['#dfb200','#d90134', '#0057ef']} 
                          />
                        }>
                <Content>
                        <List
                            dataArray={this.state.trainings}
                            renderRow={training =>
                                <ListItem button onPress={() => {this.moveTo(training)}}>
                                    <Grid>
                                        <Row>
                                            <Col size={1}>
                                                <Icon type={"MaterialCommunityIcons"} name={iconNameFor(training)}/>
                                            </Col>
                                            <Col size={8}>
                                                <Text >
                                                    {training.title}
                                                </Text>
                                            </Col>
                                            <Col size={4}>
                                                <Text>
                                                    {moment(training.created_at).format("DD/MM/YYYY")}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Grid>
                                </ListItem>}
                        />
                </Content>
                </ScrollView>                
                <Footer style={styles.footer}>
                    <Left>
                        <Button onPress={this.signOut} rounded style={styles.plusButton}>
                            <Text>Cerrar sesión</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={this.openCreateTrainingView} rounded style={styles.plusButton}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    moveTo(training) {
        this.props.navigation.navigate('Training', {session_token: this.session_token, selectedTraining: training})
    }

    openCreateTrainingView() {
        this.props.navigation.navigate('CreateTraining', {session_token: this.session_token})
    }

    signOut(){
        resetTokenAndRenewID();
        this.goBackToLogin();
    }

    goBackToLogin() {
        var action = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})]
          });
          this.props.navigation.dispatch(action);
    }
}

function resetTokenAndRenewID(){

    AsyncStorage.setItem("access_token", "");
    AsyncStorage.setItem("renew_id", "");

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#FFFFFF'
    },
    text:{
        color:'black'
    },
    image:{
        marginRight:10
    },
    itemText:{
        color:'black'
    },
    item:{
        flex:1,
        flexDirection:'row',
        padding:10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    titleText:{
        fontWeight:'bold'
    },
    footer:{
        backgroundColor: '#FFFFFF'
    },
    plusButton:{
        backgroundColor: '#2666ff',
        marginRight: 10,
        marginBottom: 10
    },
    icon: {
        width: 24,
        height: 24,
    }
});