import React, { Component } from 'react';

import {
    StyleSheet,
    Dimensions,
    AsyncStorage
} from 'react-native';

import {
    Button,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Text
} from 'native-base';

import SignUp from "./SignUp";
import RecoverPassword from "./RecoverPassword";
import Trainings from "./Trainings";

export default class Login extends Component{

    static navigationOptions = {
        title: 'Entrenamiento'
    };

    constructor(props) {
        super(props);
        this.state = {
            emailText: undefined,
            passwordText: undefined,
            validatingEmail: false
        };

        //Logic methods
        this.onLogin = this.onLogin.bind(this);
        this.signUp = this.signUp.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);
        this.trainings = this.trainings.bind(this);

        this.emailValidation = this.emailValidation.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.renderEmailError = this.renderEmailError.bind(this);

        this.setPassword = this.setPassword.bind(this);
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form style={styles.container}>
                            <Form style={styles.titlePosition}>
                                <Text style={styles.title}>TaekwonGo!</Text>
                            </Form>
                            <Item floatingLabel error={!this.emailValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setEmail}
                                    value={this.state.emailText}
                                    maxLength={40}
                                />
                                {this.renderEmailError()}
                            </Item>
                            <Item floatingLabel>
                                <Label>Contraseña</Label>
                                <Input
                                    onChangeText={this.setPassword}
                                    value={this.state.passwordText}
                                    maxLength={100}
                                    secureTextEntry={true}
                                />
                            </Item>
                            <Button
                                primary
                                block
                                style={styles.mbt30}
                                onPress={this.onLogin}
                            >
                                <Text style={styles.buttonText}>Ingresar</Text>
                            </Button>
                        </Form>
                        <Form style={styles.container}>
                            <Text style={styles.blueCenteredLink} onPress={this.recoverPassword}>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </Form>
                        <Form style={styles.registerView}>
                            <Text style={styles.registerText}>
                                ¿No tienes una cuenta?

                                <Text style={styles.registerPress} onPress={this.signUp}>
                                    {'\t'}Registrate
                                </Text>

                            </Text>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }

    setEmail(emailText){
        this.setState({emailText, validatingEmail:true})
    }

    setPassword(passwordText){
        this.setState({passwordText})
    }

    renderEmailError(){
        if (!this.emailValidation()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    emailValidation() {
        return !this.state.validatingEmail || isValidEmail(this.state.emailText);
    }

    onLogin(){
        LoginConector.callApi(this.buildInfo());
        this.trainings()
    }

    signUp(){
        this.props.navigation.navigate('SignUp', {})
    }

    recoverPassword(){
        this.props.navigation.navigate('RecoverPassword', {})
    }

    trainings(){
        this.props.navigation.navigate('Trainings', {})
    }

    buildInfo(){
        return {
            email:  this.state.emailText,
            password: this.state.passwordText
        }
    }
}

function isValidEmail(aString) {
    return notEmptyAndFitsRegex(aString, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function notEmptyAndFitsRegex(aString,aRegex){
    return aString !== "" && aRegex.test(aString);
}

let LoginConector = function () {
	function callApi(info) {
		fetch('http://taekwongo.herokuapp.com/users/sessions', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(info),
		})
			.then(response => response.json())
			.then(response => {
				if (response['error']) {
					alert(response['error'])
				}
				else if (response['access_token'] && response['renew_id']) {
					AsyncStorage.setItem("access_token", response['access_token']);
					AsyncStorage.setItem("renew_id", response['renew_id']);
				}
				else {
					console.log('No se comprendió el mensaje del servidor');
					console.log(response);
				}
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el el fetch: ' + error.message);
			});
	}

	return{
		callApi: callApi
	}
}();

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
        fontWeight:'bold',
        color: 'blue'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    },
    blueCenteredLink:{
        color: 'blue',
        textAlign:'center',
        marginBottom: 30
    }
});
