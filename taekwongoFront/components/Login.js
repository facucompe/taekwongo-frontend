import React, { Component } from 'react';

import {
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Image
} from 'react-native';

import {
    Button,
    Container,
    Content,
    Footer,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Text
} from 'native-base';

import SignUp from "./SignUp";
import RecoverPassword from "./RecoverPassword";
import {checkStatus, isValidEmail} from "./Commons";

export default class Login extends Component{

    static navigationOptions = {
        title: 'Entrenamiento',
        drawerLabel: 'Entrenamiento',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/entrenamiento.png')}
                style={styles.icon}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            emailText: undefined,
            passwordText: undefined,
            submittedInvalidInput: false
        };

        //Logic methods
        this.onLogin = this.onLogin.bind(this);
        this.signUp = this.signUp.bind(this);
        this.recoverPassword = this.recoverPassword.bind(this);

        this.emailValidation = this.emailValidation.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.renderEmailError = this.renderEmailError.bind(this);

        this.setPassword = this.setPassword.bind(this);
    }

    componentWillMount(){
        this.openTrainingsView();
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
                            <Item floatingLabel error={this.shouldRenderEmailError()}>
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
                            <Text style={styles.mb150t30}>
                                ¿Olvidaste tus datos de inicio de sesión?

                                <Text style={styles.registerPress} onPress={this.recoverPassword}>
                                    {'\t'}Obtén ayuda
                                </Text>
                            </Text>
                        </Form>
                    </Form>
                </Content>
                <Footer style ={styles.registerView}>
                    <Text style={styles.registerText}>
                        ¿No tienes una cuenta?

                        <Text style={styles.registerPress} onPress={this.signUp}>
                            {'\t'}Registrate
                        </Text>

                    </Text>
                </Footer>
            </Container>
        );
    }

    setEmail(emailText){
        this.setState({emailText})
    }

    setPassword(passwordText){
        this.setState({passwordText})
    }

    renderEmailError(){
        if (this.shouldRenderEmailError()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    shouldRenderEmailError() {
        return this.state.submittedInvalidInput && !this.emailValidation();
    }

    emailValidation() {
        return isValidEmail(this.state.emailText);
    }

    onLogin(){
        var _this = this;
        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            callLoginApi(this.buildInfo()).then(function() {
                _this.openTrainingsView();
            });
        }
        else{
            this.setState({submittedInvalidInput: true});
            alert("Completar usuario y contraseña correctamente");
        }
    }

    allFieldsCompleted(){
        return this.state.emailText !== undefined && this.state.passwordText !== undefined && this.state.emailText !== "" && this.state.passwordText !== ""
    }

    postOkFieldValidations(){
        return this.emailValidation()
    }

    signUp(){
        this.props.navigation.navigate('SignUp', {})
    }

    recoverPassword(){
        this.props.navigation.navigate('RecoverPassword', {})
    }

    navigateToTrainingsView(token){
        if(token != undefined) {
            this.props.navigation.navigate('Trainings', {session_token: token})
        }

    }

    openTrainingsView() {
        var _this = this;

        getToken().then(function(token, i) {
            _this.navigateToTrainingsView(token);
        });
    }

    buildInfo(){
        return {
            email:  this.state.emailText,
            password: this.state.passwordText
        }
    }
}

function callLoginApi(info) {
    return fetch('http://taekwongo.herokuapp.com/users/sessions', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info),
    })
        .then(response => response.json())
        .then(response => checkStatus(response))
        .then(response => {
            if (response['error']) {
                if(response['error']=== "Invalid email or password")
                    alert("Usuario o contraseña incorrectos");
                else
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

function getToken() {
    return AsyncStorage.getItem("access_token");
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#FFFFFF'
    },
    registerText:{
        textAlign:'center'
    },
    registerPress:{
        fontWeight:'bold'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    },
    mb150t30: {
        marginBottom: 180,
        marginTop: 30
    },
    icon: {
        width: 24,
        height: 24,
    }
});
