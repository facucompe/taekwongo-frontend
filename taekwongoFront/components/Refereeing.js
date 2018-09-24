import React, { Component } from 'react';

import {
    StyleSheet,
    Image
} from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import {checkStatus} from "./Commons";

export default class Refereeing extends Component {
    static navigationOptions = {
        title: 'Arbitraje',
        drawerLabel: 'Arbitraje',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/arbitraje5.png')}
                style={styles.icon}
            />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            changes : [0,1,2]
        };
        //Logic method
        this.onPressButton = this.onPressButton.bind(this);
    }

    componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/refereeing', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => checkStatus(response))
            .then(response => {
                this.setState({changes: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    renderChanges = (item,i) => {
        return (

            <ListItem thumbnail onPress={() => this.moveToItem(item)}>
                <Left>
                    <Thumbnail source={{ uri: 'https://image.ibb.co/mqPwkK/TAEKWONGO.png' }} />
                </Left>
                <Body>
                <Text numberOfLines={2}>Cambio en Arbitraje</Text>
                <Text note numberOfLines={2}>Descripcion del cambio en el arbitraje</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.moveToItem(item)}>
                        <Text>Ver Mas</Text>
                    </Button>
                </Right>
            </ListItem>

        )
    };

    render() {
        return (

            <Container>
                <Content padder>
                    <Button
                        primary
                        block
                        style={styles.mbt30}
                        onPress={() => this.onPressButton()}
                    >
                        <Text style={styles.buttonText}>Ver Información</Text>
                    </Button>

                    <List>
                        {this.state.changes.map(this.renderChanges)}
                    </List>
                </Content>
            </Container>

        );
    }

    moveToItem(item){
        this.props.navigation.navigate('RefereeingItem')
    }

    onPressButton(){
        this.props.navigation.navigate('RefereeingInfo')
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#F5FCFF',
    },
    button:{
        height:40,
        alignItems: 'center',
        backgroundColor: '#002eff',
        justifyContent:'center',
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        padding:5,

    },
    buttonAndHelp:{
        marginLeft:'10%',
        marginRight:'10%'
    },
    textButton:{
        color:'white'
    },
    input:{
        height:30,
        marginTop:10,

    },
    borderInput:{
        justifyContent:'center',
        marginTop:10,
        borderRadius: 8,
        borderWidth:1,
        borderColor: '#a1a4a3',
        marginLeft:'10%',
        marginRight:'10%'
    },
    title:{
        fontSize:40,
        color:'black',
    },
    titlePosition:{
        alignItems:'center'
    },
    registerView:{
        borderTopWidth:1,
        borderColor:'#a1a4a3',
        padding:15,
    },
    registerText:{
        textAlign:'center'
    },
    registerPress:{
        fontWeight:'bold'
    },
    mbt30: {
        marginBottom: 10,
        marginTop: 10
    },
    mb150t30: {
        marginBottom: 180,
        marginTop: 30
    },
    icon: {
        width: 24,
        height: 24,
    }
});