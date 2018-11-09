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
import {NavigationActions} from "react-navigation";

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Recuperar Contraseña'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            submittedInvalidInput: false
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
                            <Item floatingLabel error={this.shouldRenderEmailError()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setEmail}
                                    value={this.state.email}
                                    maxLength={30}
                                    autoCapitalize={"none"}
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
        return this.shouldRenderEmailError() ? <Icon name='close-circle'/> : null;
    }

    shouldRenderEmailError() {
        return this.state.submittedInvalidInput && !this.emailValidation();
    }

    emailValidation() {
        return isValidEmail(this.state.email);
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
            this.setState({submittedInvalidInput: true});
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
        var action = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})]
        });
        this.props.navigation.dispatch(action);
    }

    recoverPasswordInfo() {
        return {
            email: this.state.email
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