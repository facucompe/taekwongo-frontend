import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';

//import * as LoginConector from '../conectors/LoginConector.js';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textUser: 'facu.come@gmail.com',
            textPassword: 'password',
        };
        this.onLogin = this.onLogin.bind(this)
    }

    render(){
        return (
            <View>
                <View>
                    <Text>User:</Text>
                    <TextInput
                        style={inputStyles.input}
                        onChangeText={(text) => this.setState({textUser: text})}
                        value={this.state.textUser}
                        maxLength={30}
                    />
                    <Text>Password:</Text>
                    <TextInput
                        style={inputStyles.input}
                        onChangeText={(text) => this.setState({textPassword: text})}
                        value={this.state.textPassword}
                        maxLength={100}
                    />
                </View>
                <TouchableHighlight onPress={(this.onLogin)} style={styles.button}>
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableHighlight>
            </View>
        );
    }

    onLogin(){
        console.debug('Envia login ' + this.state.textUser);
        LoginConector.callApi(this.buildInfo(), this.onSuccessLogin, this.onError)
    }

    onSuccessLogin(data){
        console.log(data)
    }

    onError(error){  // EL MANEJO DE ERRORES NO FUNCIONA
        console.log("cosas: ")
        console.log(error)
        if(error.response.status >400 && error.response.status < 500){
            console.log("Usuario o contraseña incorrectos")
        }else{
            console.log("Ups.. problemas en el servidor")
        }
    }

    buildInfo(){
        return {
            email:  this.state.textUser,
            password: this.state.textPassword
        }
    }
}

const inputStyles = StyleSheet.create({
    input:{
        borderRadius: 6,
        height:49

    }
})
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


var LoginConector = function () {
    function callApi(info, successFunction, errorFunction) {
        fetch('http://192.168.0.21:3000/users/sessions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
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