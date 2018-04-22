import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    StyleSheet,
    TextInput
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';

import SignUp from "./SignUp";
//import * as LoginConector from '../conectors/LoginConector.js';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textUser: '',
            textPassword: '',
        };

        //Logic methods
        this.onLogin = this.onLogin.bind(this)
        this.signUp = this.signUp.bind(this)
        this.help = this.help.bind(this)
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titlePosition}>
                    <Text style={styles.title}>TaekwonGo!</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({textUser: text})}
                            placeholder={'User'}
                            value={this.state.textUser}
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({textPassword: text})}
                            value={this.state.textPassword}
                            placeholder={'Password'}
                            maxLength={100}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View>
                        <TouchableHighlight onPress={(this.onLogin)} style={styles.button}>
                            <Text style={styles.textButton}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text>¿Olvidaste tus datos de inicio de sesion? <Text style={styles.registerPress} onPress={this.help}>Obten ayuda</Text></Text>
                    </View>
                </View>
                <View style={styles.registerView}>
                    <Text style={styles.registerText}>¿No tienes cuenta? <Text style={styles.registerPress} onPress={this.signUp}>Registrate.</Text></Text>
                </View>
            </View>
        );
    }

    onLogin(){
        console.debug('Envia login ' + this.state.textUser);
        LoginConector.callApi(this.buildInfo(), this.onSuccessLogin, this.onError)
    }

    signUp(){
        console.log('vamos a registrar')
        this.props.navigation.navigate('SignUp')
    }

    help(){

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

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#F5FCFF',
    },
    form:{
        alignItems:'center'
    },
    button:{
        width:300,
        height:40,
        alignItems: 'center',
        backgroundColor: '#002eff',
        justifyContent:'center',
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        padding:5
    },
    textButton:{
        color:'white'
    },
    input:{
        height:30,
        marginTop:10,
        width:300

    },
    borderInput:{
        justifyContent:'center',
        marginTop:10,
        borderRadius: 8,
        borderWidth:1,
        borderColor: '#a1a4a3'
    },
    title:{
        fontSize:40,
        color:'black',
    },
    titlePosition:{
        alignItems:'center'
    },
    registerView:{
        borderTopWidth:1,
        borderColor:'#a1a4a3',
        padding:15,
    },
    registerText:{
        textAlign:'center'
    },
    registerPress:{
        fontWeight:'bold'
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