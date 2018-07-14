import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Alert,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';

import SignUp from "./SignUp";

export default class Login extends Component{
    static navigationOptions = {
        title: 'Entrenamiento'
    }
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
                    <View style={styles.buttonAndHelp}>
                        <TouchableHighlight onPress={(this.onLogin)} style={styles.button}>
                            <Text style={styles.textButton}>Log In</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.buttonAndHelp}>
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
        LoginConector.callApi(this.buildInfo())
    }

    signUp(){
        this.props.navigation.navigate('SignUp', { hola: 'hola' })
    }

    help(){

    }

    buildInfo(){
        return {
            email:  this.state.textUser,
            password: this.state.textPassword
        }
    }
}

let LoginConector = function () {
	function callApi(info) {
		fetch('http://taekwongo.herokuapp.com/users/sessions', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		})
			.then(response => response.json())
			.then(response => {
				console.log(response);
				if (response['error']) {
					alert(response['error'])
				} else {
					AsyncStorage.setItem("id_token", response.token); // Revisar nombres de campos
				}
			})
			.catch(
				function (error) {
					console.log('Error en el el fetch: ' + error.message);
					alert('Error de conexión, intente nuevamente');
				});
	}

	return{
		callApi: callApi
	}
}()

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#F5FCFF',
    },
    button:{
        height:40,
        alignItems: 'center',
        backgroundColor: '#002eff',
        justifyContent:'center',
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        borderWidth:1,
        padding:5,

    },
    buttonAndHelp:{
        marginLeft:'10%',
        marginRight:'10%'
    },
    textButton:{
        color:'white'
    },
    input:{
        height:30,
        marginTop:10,

    },
    borderInput:{
        justifyContent:'center',
        marginTop:10,
        borderRadius: 8,
        borderWidth:1,
        borderColor: '#a1a4a3',
        marginLeft:'10%',
        marginRight:'10%'
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
