import React, { Component } from 'react';

import {
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Spinner } from 'native-base';
import {checkStatus} from "./Commons";


export default class NewsFeed extends Component {

    static navigationOptions = {
        title: 'Novedades',
        drawerLabel: 'Novedades',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/news.png')}
                style={styles.icon}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            isLoading: true
        };
    }

    componentDidMount() {
		fetch('http://taekwongo.herokuapp.com/feeds', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
		}})
			.then(response => response.json())
            .then(response => checkStatus(response))
			.then(response => {
			    this.setState({isLoading:false});
				this.setState({news: response});
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el el fetch: ' + error.message);
			});
	}

    renderItemNewsFeed = (item,i) => {
        return (
            <ListItem thumbnail onPress={() => this.moveToItem(item)}>
                <Left>
                    <Thumbnail source={{ uri: item.picture_url }} />
                </Left>
                <Body>
                <Text numberOfLines={2}>{item.title}</Text>
                <Text note numberOfLines={2}>{item.body}</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.moveToItem(item)}>
                        <Text>Ver Mas</Text>
                    </Button>
                </Right>
            </ListItem>
            )
    };

    moveToItem(item){
        this.props.navigation.navigate('ItemNewsFeed', { item: item })
    }

    render () {
			let show;
			if (this.state.news === []) {
				show = <Text>No Hay novedades para mostrar</Text>;
			}
			else {
				show = this.state.news.map(this.renderItemNewsFeed);
			}
		return (
            <Container>
            <Content>
            <List>
                {show}

                {this.state.isLoading && (
                    <Spinner color='blue' />
                )}
    </List>
    </Content>
    </Container>
		)
	}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5FCFF'
    },
    flexBox:{
        flex:1,
        flexDirection:'column'
    },
    text:{
        color:'black'
    },
    bodyContainer:{
        flex:1,
        flexDirection:'row',
    },
    itemText:{
        color:'#000'
    },
    item:{
        flex:1,
        flexDirection:'row',
    },
    itemContainer:{
        height:100,
        padding:10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    titleText:{
        fontWeight:'bold',
        color:'#000',
        fontSize:15,
    },
    titleContainer:{
        flex:1,
        flexDirection:'row',
    },
    imageContainer:{
        marginRight:10
    },
    image:{
        height:100,
        width:100
    },
    icon: {
        width: 24,
        height: 24,
    }
})
