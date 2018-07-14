import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default class Feeds extends Component {

    static navigationOptions = {
        title: 'Novedades'
    }

    constructor(props) {
        super(props);
        this.state = {
            feeds: [],
            error: true
        };
    }

    componentDidMount(){
        fetch('http://taekwongo.herokuapp.com/feeds')
            .then(response => response.json())
            .then(response => {
                this.setState({feeds: response, error: false});
            })
            .catch(
                function(error) {
                    console.log('Error en el el fetch: ' + error.message);
                }
            );
    }

    renderFeed = (item,i) => {
        return (
            <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => this.moveToItem(item)}>
                <View style={styles.image}>
                    <Text>Imagen</Text>
                </View>
                <View>
                    <View><Text style={styles.titleText}>{item.title}</Text></View>
                    <View><Text style={styles.bodyText}>{item.body}</Text></View>
                </View>
            </TouchableOpacity>)
    }

    moveToItem(item){
        this.props.navigation.navigate('ItemFeed', { itemId: item.title })
    }

    render () {
        let mensage;
        if (this.state.error) {
        	alert('Error de conexión, intente nuevamente');
        	mensage = <Text> </Text>
        } else {
            mensage = <View style={styles.container}> this.state.feeds.map(this.renderFeed)} </View>
        }
        return (
            <View>
                {mensage}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF'
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
    }
})
