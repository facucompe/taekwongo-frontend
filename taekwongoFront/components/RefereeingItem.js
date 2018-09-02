import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';


export default class RefereeingItem extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Item`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Text>Un Item</Text>
                </Content>
            </Container>
        );
    }
}