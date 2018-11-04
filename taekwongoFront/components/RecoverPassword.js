import React, { Component } from 'react';

import {
    StyleSheet,
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
import {isValidEmail, checkStatus} from "./Commons";

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Recuperar Contraseña'
    };

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            validatingUser: false,
        };

        this.onRecoverPassword = this.onRecoverPassword.bind(this);

        this.renderUserError = this.renderUserError.bind(this);
        this.setUser = this.setUser.bind(this);
        this.userValidation = this.userValidation.bind(this);
    }

    setUser(user){
        this.setState({user, validatingUser:true})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form style={styles.container}>
                            <Item floatingLabel error={!this.userValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setUser}
                                    value={this.state.user}
                                    maxLength={30}
                                />
                                {this.renderUserError()}
                            </Item>
                            <Button
                                primary
                                block
                                style={styles.mbt30}
                                onPress={(this.onRecoverPassword)}
                            >
                                <Text style={styles.buttonText}>Recuperar contraseña</Text>
                            </Button>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }


    renderUserError(){
        return this.userValidation() ? null : <Icon name='close-circle'/>;
    }

    userValidation() {
        return !this.state.validatingUser || isValidEmail(this.state.user);
    }

    onRecoverPassword() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            fetch('https://taekwongo.herokuapp.com/users/sessions/reset_password', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.recoverPasswordInfo()),
            })
            //La respuesta viene con error aunque anda, lo tuve que hacer asi para que por lo menos chequee 
            //y tire error si la respuesta es incorrecta.
                .then(response => {
                    var status = checkStatus(response);
                    if (status) {
                        alert('Se ha enviado un mail a su casilla para que pueda recuperar su contraseña');
                        this.moveToLoginScreen();
                    }
                })
                .catch(error => {
                    alert('Ha habido un error. Pruebe más tarde');
                    console.log('Error en el fetch: ' + error.message);
                });
        }
        else {
            alert("Corregir campos inválidos");
        }
    }

    allFieldsCompleted(){
        return this.state.user !== undefined;
    }

    postOkFieldValidations(){
        return this.userValidation();
    }

    moveToLoginScreen() {
        this.props.navigation.navigate('Login', {})
    }

    recoverPasswordInfo() {
        return {
            email: this.state.user
        };
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
    },
    buttonText:{
        color:'white'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});