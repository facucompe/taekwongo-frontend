import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const items = [
    { name: 'one'},
    { name: 'two'},
    { name: 'three'},
    { name: 'four'},
]

export default class Feeds extends Component {

    static navigationOptions = {
        title: 'Novedades'
    }

    constructor(props) {
        super(props);
        this.state = {
            feeds: [],
            hasfetch: false
        };
    }

    renderItem = (item, i) => {
        return (
            <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => this.moveToItem(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>)
    }

    renderFeed = (item,i) => {
        console.log('algo')
        return (
            <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => this.moveToItem(item)}>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>)
    }

    moveToItem(item){
        this.props.navigation.navigate('ItemFeed', { itemId: item.name })
    }
    render () {
        return (
        if (this.state.hasfetch) {
            //this.state.feeds.map(this.renderFeed)
            <View style={styles.container}>
                <Text style={styles.text}>{`wazaib`}</Text>
            </View>
        }}
            <View style={styles.container}>
                <Text style={styles.text}>{`Bienvenido al Feed de Takekwongo!`}</Text>
            </View>
        )
    }

    onFeed(){
        FeedsConector.callApi(this.onSuccess, this.onError)
    }

    onSuccess(data){
        this.setState({
            feeds: data,
            hasfetch: true
    });
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
    itemText:{
        color:'black'
    },
    item:{
        alignItems:'center'
    }
})
var FeedsConector = function () {
    function callApi(successFunction, errorFunction) {
        //fetch('http://taekwongo.herokuapp.com/feeds', {
        fetch('http://192.168.0.12:3000/feeds')
        .then(response => response.json())
        .then(response => {
            successFunction(response)
        })
        .catch(error => {
            errorFunction(error)
        });
    }

    return{
        callApi: callApi
    }
}()
