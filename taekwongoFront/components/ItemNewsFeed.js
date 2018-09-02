import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';


export default class ItemNewsFeed extends Component {

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
        const item = this.props.navigation.getParam('item', 'NO-ID');
        return (
            <Container>
                <Content>
                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: 'https://image.ibb.co/mqPwkK/TAEKWONGO.png'}} />
                                <Body>
                                <Text>{item.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Image source={{uri: item.picture_url}} style={{height: 200, width: '100%', flex: 1}}/>
                            <Text>
                                {item.body}
                            </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}


