import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';

import {
    Button,
    Col,
    Container,
    Content,
    DatePicker,
    Form,
    Grid,
    Icon,
    Input,
    Item,
    Label,
    Picker,
    Text
} from 'native-base';

import moment from 'moment';

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Registrarme'
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: undefined,
            lastName: undefined,
            birthDate: undefined,
            gender: 'male',
            nationality: 'argentina',
            email: undefined,
            password: undefined,
            confirmedPassword: undefined,
            validatingFirstName: false,
            validatingLastName: false,
            validatingBirthDate: false,
            validatingGender: false,
            validatingNationality: false,
            validatingEmail: false,
            validatingPassword: false,
            validatingConfirmedPassword: false
        };

        this.onRegister = this.onRegister.bind(this);
        this.logIn = this.logIn.bind(this);

        this.renderFirstNameError = this.renderFirstNameError.bind(this);
        this.renderLastNameError = this.renderLastNameError.bind(this);
        this.renderEmailError = this.renderEmailError.bind(this);
        this.renderPasswordError = this.renderPasswordError.bind(this);
        this.renderConfirmedPasswordCheck = this.renderConfirmedPasswordCheck.bind(this);
        this.renderConfirmedPasswordErrorText = this.renderConfirmedPasswordErrorText.bind(this);
        this.renderPasswordErrorText = this.renderPasswordErrorText.bind(this);

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setBirthDate = this.setBirthDate.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmedPassword = this.setConfirmedPassword.bind(this);

        this.firstNameValidation = this.firstNameValidation.bind(this);
        this.lastNameValidation = this.lastNameValidation.bind(this);
        this.birthDateValidation = this.birthDateValidation.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.confirmedPasswordValidation = this.confirmedPasswordValidation.bind(this);
    }

    setFirstName(firstName){
        this.setState({firstName, validatingFirstName: true })
    }

    setLastName(lastName){
        this.setState({lastName, validatingLastName: true })
    }

    setBirthDate(birthDate) {
        this.setState({ birthDate, validatingBirthDate: true });
    }

    setEmail(email){
        this.setState({email, validatingEmail:true})
    }

    setPassword(password){
        this.setState({password, validatingPassword:true})
    }

    setConfirmedPassword(confirmedPassword){
        this.setState({confirmedPassword, validatingConfirmedPassword:true})
    }

    onValueChangeGender(gender){
        this.setState({gender})
    }

    onValueChangeNationality(nationality){
        this.setState({nationality})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Form>
                            <Grid>
                                <Col>
                                    <Item floatingLabel error={!this.firstNameValidation()}>
                                        <Label>Nombre</Label>
                                        <Input
                                            onChangeText={this.setFirstName}
                                            value={this.state.firstName}
                                            maxLength={30}
                                        />
                                        {this.renderFirstNameError()}
                                    </Item>
                                </Col>
                                <Col>
                                    <Item floatingLabel error={!this.lastNameValidation()}>
                                        <Label>Apellido</Label>
                                        <Input
                                            onChangeText={this.setLastName}
                                            value={this.state.lastName}
                                            maxLength={30}
                                        />
                                        {this.renderLastNameError()}
                                    </Item>
                                </Col>
                            </Grid>
                            <Grid>
                                <Col>
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
                                </Col>
                                <Col>
                                    <Text>{'\n\t'}Nacionalidad</Text>
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
                                        <Picker.Item label="Otro" value="other" />
                                    </Picker>
                                </Col>
                            </Grid>

                            <Text>{'\t'}Género</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Género"
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="black"
                                selectedValue={this.state.gender}
                                onValueChange={this.onValueChangeGender.bind(this)}
                            >
                                <Picker.Item label="Masculino" value="male" />
                                <Picker.Item label="Femenino" value="female" />
                                <Picker.Item label="Otro" value="other" />
                            </Picker>

                            <Item floatingLabel error={!this.emailValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setEmail}
                                    value={this.state.email}
                                    maxLength={40}
                                />
                                {this.renderEmailError()}
                            </Item>
                            <Item floatingLabel error={!this.passwordValidation()}>
                                <Label>Contraseña</Label>
                                <Input
                                    onChangeText={this.setPassword}
                                    value={this.state.password}
                                    maxLength={100}
                                    secureTextEntry={true}
                                />
                                {this.renderPasswordError()}
                            </Item>
                            {this.renderPasswordErrorText()}
                            <Item floatingLabel error={!this.confirmedPasswordValidation()}>
                                <Label>Confirmar contraseña</Label>
                                <Input
                                    onChangeText={this.setConfirmedPassword}
                                    value={this.state.confirmedPassword}
                                    maxLength={100}
                                    secureTextEntry={true}
                                />
                                {this.renderConfirmedPasswordCheck()}
                            </Item>
                            {this.renderConfirmedPasswordErrorText()}
                            <Button
                                primary
                                block
                                style={styles.mbt30}
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
       return this.firstNameValidation() ? null :  <Icon name='close-circle' />;
    }

    firstNameValidation() {
        return !this.state.validatingFirstName || isValidName(this.state.firstName);
    }

    renderLastNameError(){
        return this.lastNameValidation() ? null : <Icon name='close-circle'/>;
    }

    lastNameValidation() {
        return !this.state.validatingLastName || isValidName(this.state.lastName);
    }

    renderEmailError(){
        return this.emailValidation() ? null : <Icon name='close-circle'/>;
    }

    emailValidation() {
        return !this.state.validatingEmail || isValidEmail(this.state.email);
    }

    renderPasswordError(){
        return this.passwordValidation() ? null : <Icon name='close-circle'/>;
    }

    renderPasswordErrorText(){
        return this.passwordValidation() ? null :
            <Text style={styles.errorText}>Las contraseña debe tener más de 8 caracteres.</Text>;
    }

    passwordValidation() {
        return !this.state.validatingPassword || isValidPassword(this.state.password);
    }

    renderConfirmedPasswordCheck(){
        if (this.confirmedPasswordValidation()) {
            if (this.state.confirmedPassword !== undefined && this.state.confirmedPassword.length > 0) {
                return <Icon name='checkmark-circle'/>;
            }
            else
            return null;
        }

        else
            return <Icon name='close-circle' color='green'/>;

    }

    renderConfirmedPasswordErrorText(){
        return this.confirmedPasswordValidation() ? null :
            <Text style={styles.errorText}>Las contraseñas ingresadas no coinciden.</Text>;

    }

    confirmedPasswordValidation() {
        return !this.state.validatingConfirmedPassword || matchBetween(this.state.password, this.state.confirmedPassword);
    }

    birthDateValidation() {
        return !this.state.validatingBirthDate || isValidBirthDate(this.state.birthDate);
    }

    onRegister() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            alert("Datos OK :)");
            fetch('http://taekwongo.herokuapp.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.creationInfo()),
            }).then((res) => {
                alert('Ya podes realizar tus entrenamientos');    
            }).catch((err) => {
                alert('Ha habido un error. Pruebe más tarde);
            });
        }
        else {
            alert("Corregir campos inválidos");
        }

    }

    allFieldsCompleted(){
        return this.state.firstName !== undefined &&  this.state.lastName !== undefined && this.state.birthDate !== undefined && this.state.gender !== undefined && this.state.nationality !== undefined && this.state.email !== undefined && this.state.password !== undefined && this.state.confirmedPassword !== undefined;
    }

    postOkFieldValidations(){
        return this.firstNameValidation() && this.lastNameValidation() && this.birthDateValidation() &&  this.emailValidation()  && this.passwordValidation() && this.confirmedPasswordValidation();
    }

    logIn() {
        this.props.navigation.navigate('Login', {});
    }

    creationInfo() {
        return {
            user: {
                email: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                birth_date: this.state.birthDate,
                country: this.state.nationality,
                gender: this.state.gender,
                password: this.state.password,
                password_confirmation: this.state.confirmedPassword
            }
        }
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
    buttonText:{
        color:'white'
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
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});