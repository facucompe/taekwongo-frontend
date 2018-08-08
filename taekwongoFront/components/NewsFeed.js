import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

export default class NewsFeed extends Component {

    static navigationOptions = {
        title: 'Novedades'
    }

    constructor(props) {
        super(props);
        this.state = {
            news: []
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
			.then(response => {
				this.setState({news: response});
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el el fetch: ' + error.message);
			});
	}

    renderItemNewsFeed = (item,i) => {
        return (
            <View style={styles.itemContainer}>
            <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => this.moveToItem(item)}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: item.picture_url}}
                    />
                </View>
                <View>
                    <View><Text style={styles.titleText}>{item.title}</Text></View>
                    <View><Text style={styles.bodyText}>{item.body}</Text></View>
                </View>
            </TouchableOpacity>
            </View>)
    }

    moveToItem(item){
        this.props.navigation.navigate('ItemNewsFeed', { itemTitle: item.title })
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
			<View style={styles.container}>
				{show}
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5FCFF'
    },
    text:{
        color:'black'
    },
    itemText:{
        color:'black'
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
        fontWeight:'bold'
    },
    imageContainer:{
        marginRight:10
    },
    image:{
        height:100,
        width:100
    }
})
