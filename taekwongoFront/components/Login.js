import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    StyleSheet
} from 'react-native';

export default class Login extends Component{
    render(){
        return (
            <View>
                <TouchableHighlight onPress={(this.onLogin.bind(this))} style={styles.button}>
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableHighlight>
            </View>
        );
    }

    onLogin(){
        console.log('Se ha pulsado el boton');
    }
}

const styles = StyleSheet.create({
    button:{
        width:300,
        height:30,
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent:'center',
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        padding:5
    },
    textButton:{
        color:'white'
    }
})