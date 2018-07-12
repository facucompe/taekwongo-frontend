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
            feeds: []
        };
    }

    componentDidMount(){
        console.log("entramo al did mount")
        //this.onFeed(this.setState)
        fetch('http://192.168.0.12:3000/feeds')
            .then(response => response.json())
            .then(response => {
                this.setState({feeds: response})
            })
            .catch(error => {
                this.onError(error)
            });
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
        return (
            <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => this.moveToItem(item)}>
                <Text style={styles.itemText}>{item.id}</Text>
            </TouchableOpacity>)
    }

    moveToItem(item){
        this.props.navigation.navigate('ItemFeed', { itemId: item.title })
    }
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{`Bienvenido al Feed de Takekwongo!`}</Text>
                {this.state.feeds.map(this.renderFeed)}
            </View>
        )
    }

    onFeed(setState){
        FeedsConector.callApi(setState,this.onSuccess, this.onError)
    }

    onSuccess(setState,data){
        console.log("merlusa")
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
    itemText:{
        color:'black'
    },
    item:{
        alignItems:'center'
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
