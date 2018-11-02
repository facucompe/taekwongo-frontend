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
import {checkStatus, isValidEmail} from "./Commons";

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Recuperar Contraseña'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: undefined
        };

        this.onRecoverPassword = this.onRecoverPassword.bind(this);

        this.renderEmailError = this.renderEmailError.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
    }

    setEmail(email){
        this.setState({email})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form style={styles.container}>
                            <Item floatingLabel error={!this.emailValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setEmail}
                                    value={this.state.email}
                                    maxLength={30}
                                />
                                {this.renderEmailError()}
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


    renderEmailError(){
        return this.emailValidation() ? null : <Icon name='close-circle'/>;
    }

    emailValidation() {
        return isValidEmail(this.state.email);
    }

    onRecoverPassword() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            this.executePasswordRecoveryRequest().then(
                () => {
                    alert("Revise su casilla de email para reestablecer su contraseña.");
                    this.moveToLoginScreen()
                });
        }
        else {
            alert("Ingrese un email válido.");
        }
    }

    allFieldsCompleted(){
        return this.state.email !== undefined && this.state.email !== "";
    }

    postOkFieldValidations(){
        return this.emailValidation();
    }

    moveToLoginScreen() {
        this.props.navigation.navigate('Login', {})
    }

    executePasswordRecoveryRequest() {
        return fetch('http://taekwongo.herokuapp.com/users/sessions/reset_password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.creationInfo()),
        })
            .then(response => response.json())
            .then(response => checkStatus(response))
            .catch(error => {
                alert('Ha habido un error. Pruebe más tarde');
                console.log('Error en el el fetch: ' + error.message);
            })
    }

    creationInfo(){
        return {
            email: this.state.email
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
    buttonText:{
        color:'white'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});