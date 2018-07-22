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

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Recuperar Contraseña'
    }

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

    setUser(aUser){
        this.setState({user: aUser, validatingUser:true})
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
        if (!this.userValidation()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    userValidation() {
        return !this.state.validatingUser || isValidEmail(this.state.user);
    }

    onRecoverPassword() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            alert("Datos OK :)");
            //To Do: Sacar el alert y hacer el POST al backend para recuperar la contraseña
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
}

function isValidEmail(aString) {
    return notEmptyAndFitsRegex(aString, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function notEmptyAndFitsRegex(aString,aRegex){
    return aString !== "" && aRegex.test(aString);
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