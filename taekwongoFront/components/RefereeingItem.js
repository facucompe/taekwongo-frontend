import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Item } from 'native-base';


export default class RefereeingItem extends Component {

    static navigationOptions = ({ navigation }) => ({
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
                    <Card transparent style={{flex: 0, borderWidth:0}} >
                        <CardItem bordered>
                            <Left>
                                <Body>
                                <Text style={{fontWeight:'bold', fontSize:20}}>{item.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Image source={{uri: item.picture_url}} style={{height: 200, width: '100%', flex: 1}}/>
                            </Body>
                        </CardItem>
                        <CardItem style={{marginTop:0}}>
                            <Body>
                                <Text style={{color:'#3e3e3e'}}>
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
