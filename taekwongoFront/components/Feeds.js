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
            feeds: []
        };
    }

    componentDidMount(){
        fetch('http://192.168.0.12:3000/feeds')
            .then(response => response.json())
            .then(response => {
                this.setState({feeds: response})
            })
            .catch(error => {
                this.onError(error)
            });
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
        return (
            <ScrollView>
            <View style={styles.container}>
                {this.state.feeds.map(this.renderFeed)}
            </View>
            </ScrollView>
        )
    }


    onSuccess(setState,data) {
        setState({feeds:data})
    }

    onError(error){  // EL MANEJO DE ERRORES NO FUNCIONA
        console.log("Ups.. problemas en el servidor")
        console.log(error)
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
var FeedsConector = function () {
    function callApi(setState,successFunction, errorFunction) {
        fetch('http://192.168.0.12:3000/feeds')
        .then(response => response.json())
        .then(response => {
            successFunction(setState,response)
        })
        .catch(error => {
            errorFunction(error)
        });
    }

    return{
        callApi: callApi
    }
}()
