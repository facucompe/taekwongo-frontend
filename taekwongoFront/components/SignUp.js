import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation's

import {
    Button,
    Container,
    Content,
    DatePicker,
    Footer,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Picker,
    Text
} from 'native-base';

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Registrarme'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: undefined,
            lastName: undefined,
            birthDate: new Date(),
            gender: undefined,
            nationality: undefined,
            user: undefined,
            password: undefined,
            confirmedPassword: undefined,
            validatingFirstName: false,
            validatingLastName: false,
            validatingUser: false,
            validatingConfirmedPassword: false
        };

        this.onRegister = this.onRegister.bind(this);
        this.logIn = this.logIn.bind(this);

        this.renderFirstNameError = this.renderFirstNameError.bind(this);
        this.renderLastNameError = this.renderLastNameError.bind(this);
        this.renderUserError = this.renderUserError.bind(this);
        this.renderPasswordError = this.renderPasswordError.bind(this);
        this.renderConfirmedPasswordError = this.renderConfirmedPasswordError.bind(this);

        this.setBirthDate = this.setBirthDate.bind(this);
    }

    setBirthDate(newDate) {
        this.setState({ birthDate: newDate });
    }

    onValueChangeGender(value){
        this.setState({ gender: value})
    }

    onValueChangeNationality(value){
        this.setState({ nationality: value})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form style={styles.container}>

                            <Item floatingLabel error={!this.firstNameValidation()}>
                                <Label>Nombre</Label>
                                <Input
                                    onChangeText={(text) => this.setState({firstName: text})}
                                    value={this.state.firstName}
                                    maxLength={30}
                                />
                                {this.renderFirstNameError()}
                            </Item>

                            <Item floatingLabel error={!this.lastNameValidation()}>
                                <Label>Apellido</Label>
                                <Input
                                    onChangeText={(text) => this.setState({lastName: text})}
                                    value={this.state.lastName}
                                    maxLength={30}
                                />
                                {this.renderLastNameError()}
                            </Item>

                            <Text>{'\n\t'}Fecha de Nacimiento</Text>
                            <DatePicker

                                defaultDate={new Date(1995, 10, 30)}
                                minimumDate={new Date(1900, 1, 1)}
                                maximumDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Seleccionar Fecha"
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "black" }}
                                onDateChange={this.setBirthDate}
                            />
                            <Picker
                                mode="dropdown"
                                placeholder="Género"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="black"
                                selectedValue={this.state.gender}
                                onValueChange={this.onValueChangeGender.bind(this)}
                            >
                                <Picker.Item label="Masculino" value="m" />
                                <Picker.Item label="Femenino" value="f" />
                                <Picker.Item label="Otro" value="o" />
                            </Picker>
                            <Picker
                                mode="dropdown"
                                placeholder="Nacionalidad"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="black"
                                selectedValue={this.state.nationality}
                                onValueChange={this.onValueChangeNationality.bind(this)}
                            >
                                <Picker.Item label="Argentina" value="argentina" />
                                <Picker.Item label="Brasil" value="brasil" />
                                <Picker.Item label="Otro" value="otro" />
                            </Picker>
                            <Item floatingLabel error={!this.userValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={(text) => this.setState({user: text})}
                                    value={this.state.user}
                                    maxLength={30}
                                />
                                {this.renderUserError()}
                            </Item>
                            <Item floatingLabel error={!this.passwordValidation()}>
                                <Label>Contraseña</Label>
                                <Input
                                    onChangeText={(text) => this.setState({password: text})}
                                    value={this.state.password}
                                    maxLength={100}
                                    secureTextEntry={true}
                                />
                                {this.renderPasswordError()}
                            </Item>
                            <Item floatingLabel error={!this.confirmedPasswordValidation()}>
                                <Label>Confirmar contraseña</Label>
                                <Input
                                    onChangeText={(text) => this.setState({confirmedPassword: text})}
                                    value={this.state.confirmedPassword}
                                    maxLength={100}
                                    secureTextEntry={true}
                                />
                                {this.renderConfirmedPasswordError()}
                            </Item>
                            <Button
                                primary
                                block
                                style={styles.mbt15}
                                onPress={(this.onRegister)}
                            >
                                <Text style={styles.buttonText}>Registrarme</Text>
                            </Button>
                        </Form>
                        <Form style={styles.registerView}>
                            <Text style={styles.registerText}>
                                ¿Ya estás registrado?

                                <Text style={styles.registerPress} onPress={this.logIn}>
                                    {'\t'}Inicia sesión
                                </Text>

                            </Text>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }

    renderFirstNameError() {
        if (!this.firstNameValidation()) {
            return <Icon name='close-circle' />;
        }

        return null;
    }

    firstNameValidation() {
        return isValidName(this.state.firstName);
    }

    renderLastNameError(){
        if (!this.lastNameValidation()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    lastNameValidation() {
        return isValidName(this.state.lastName);
    }

    renderUserError(){
        if (!this.userValidation()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    userValidation() {
        return isValidEmail(this.state.user);
    }

    renderPasswordError(){
        if (!this.passwordValidation()) {
            return <Form>
                <Icon name='close-circle' />
                <Text style={styles.errorText}>{'/n'}Las contraseña debe tener más de 8 caracteres.</Text>
            </Form>

        }

        return null;
    }

    passwordValidation() {
        return isValidPassword(this.state.password);
    }

    renderConfirmedPasswordError(){
        if (!this.confirmedPasswordValidation()) {

            return <Form>
                <Icon name='close-circle' />
                <Text style={styles.errorText}>{'/n'}Las contraseñas ingresadas no coinciden.</Text>
            </Form>;
        }

        else{
            if(this.state.confirmedPassword.length>0){
                return <Icon name='checkmark-circle' />;
            }
            else
                return null;

        }
    }

    confirmedPasswordValidation() {
        return this.state.confirmedPassword !== undefined && matchBetween(this.state.password, this.state.confirmedPassword);
    }

    onRegister() {

        if (!this.birthDateValidation()) {
            alert("La fecha de nacimiento debe ser anterior al día de hoy.")
        }
        else {
            if (this.postOkFieldValidations()) {
                alert("Datos OK :)");
                //To Do: Sacar el alert y hacer el POST al backend para registrar el usuario
            }
            else {
                alert("Corregir campos inválidos");
            }
        }
    }

    birthDateValidation() {
        return isValidBirthDate(this.state.birthDate);
    }

    postOkFieldValidations(){
        return this.firstNameValidation() && this.lastNameValidation() && this.birthDateValidation() &&  this.userValidation()  && this.passwordValidation() && this.confirmedPasswordValidation();
    }

    logIn() {
        this.props.navigation.navigate('Login', {});
    }
}

function isValidName(aString) {
    return notEmptyAndFitsRegex(aString,/^[A-Za-z\s\u0027\u2019]+$/);
}

function isValidBirthDate(aDate) {
    return new Date() > aDate;
}

function isValidEmail(aString) {
    return notEmptyAndFitsRegex(aString, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function isValidPassword(aString) {
    return aString !== undefined && aString.length > 8
}

function notEmptyAndFitsRegex(aString,aRegex){
    return aString !== "" && aRegex.test(aString);
}

function matchBetween(aString,anotherString){
    return aString === anotherString;
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#F5FCFF',
    },
    buttonAndHelp:{
        marginLeft:'10%',
        marginRight:'10%'
    },
    buttonText:{
        color:'white'
    },
    input:{
        height:30,
        marginTop:10
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
    },
    errorText:{
        color: 'red'
    },
    mbt15: {
        marginBottom: 15,
        marginTop: 15
    }
});