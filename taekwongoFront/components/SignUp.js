import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
    Button,
    Container,
    Content,
    DatePicker,
    Footer,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Picker,
    Text
} from 'native-base';
import {checkStatus, isValidBirthDate, isValidEmail, isValidName, isValidPassword, matchBetween} from "./Commons";

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Registrarme'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: undefined,
            lastName: undefined,
            birthDate: undefined,
            gender: undefined,
            nationality: undefined,
            email: undefined,
            password: undefined,
            confirmedPassword: undefined,
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
        this.setState({firstName})
    }

    setLastName(lastName){
        this.setState({lastName})
    }

    setBirthDate(birthDate) {
        this.setState({birthDate});
    }

    setEmail(email){
        this.setState({email})
    }

    setPassword(password){
        this.setState({password})
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
                        <Item floatingLabel error={!this.firstNameValidation()}>
                            <Label style={{color: 'black'}}>Nombre</Label>
                            <Input
                                onChangeText={this.setFirstName}
                                value={this.state.firstName}
                                maxLength={30}
                            />
                            {this.renderFirstNameError()}
                        </Item>
                        <Item floatingLabel error={!this.lastNameValidation()}>
                            <Label style={{color: 'black'}}>Apellido</Label>
                            <Input
                                onChangeText={this.setLastName}
                                value={this.state.lastName}
                                maxLength={30}
                            />
                            {this.renderLastNameError()}
                        </Item>
                        <Picker
                            mode="dropdown"
                            placeholder="Nacionalidad"
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="black"
                            selectedValue={this.state.nationality}
                            onValueChange={this.onValueChangeNationality.bind(this)}
                        >
                            <Picker.Item label="  Nacionalidad" value={undefined} />
                            <Picker.Item label="  Argentina" value="argentina" />
                            <Picker.Item label="  Brasil" value="brasil" />
                            <Picker.Item label="  Otro" value="other" />
                        </Picker>

                        <Picker
                            mode="dropdown"
                            placeholder="Género"
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="black"
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChangeGender.bind(this)}
                        >
                            <Picker.Item label="  Género" value={undefined} />
                            <Picker.Item label="  Masculino" value="male" />
                            <Picker.Item label="  Femenino" value="female" />
                            <Picker.Item label="  Otro" value="other" />
                        </Picker>
                        <DatePicker

                            defaultDate={new Date(1995, 10, 30)}
                            minimumDate={new Date(1900, 1, 1)}
                            maximumDate={new Date()}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="  Fecha de Nacimiento"
                            textStyle={{ color: "black" }}
                            placeHolderTextStyle={{ color: "black" }}
                            onDateChange={this.setBirthDate}
                        />
                        <Item floatingLabel error={!this.emailValidation()}>
                            <Label style={{color: 'black'}}>Correo electrónico</Label>
                            <Input
                                onChangeText={this.setEmail}
                                value={this.state.email}
                                maxLength={40}
                            />
                            {this.renderEmailError()}
                        </Item>
                        <Item floatingLabel error={!this.passwordValidation()}>
                            <Label style={{color: 'black'}}>Contraseña</Label>
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
                            <Label style={{color: 'black'}}>Confirmar contraseña</Label>
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
                </Content>
                <Footer style={styles.registerView}>
                    <Text style={styles.registerText}>
                        ¿Ya estás registrado?

                        <Text style={styles.registerPress} onPress={this.logIn}>
                            {'\t'}Inicia sesión
                        </Text>

                    </Text>
                </Footer>
            </Container>
        );
    }

    renderFirstNameError() {
        return this.firstNameValidation() ? null :  <Icon name='close-circle' />;
    }

    firstNameValidation() {
        return isValidName(this.state.firstName);
    }

    renderLastNameError(){
        return this.lastNameValidation() ? null : <Icon name='close-circle'/>;
    }

    lastNameValidation() {
        return isValidName(this.state.lastName);
    }

    renderEmailError(){
        return this.emailValidation() ? null : <Icon name='close-circle'/>;
    }

    emailValidation() {
        return isValidEmail(this.state.email);
    }

    renderPasswordError(){
        return this.passwordValidation() ? null : <Icon name='close-circle'/>;
    }

    renderPasswordErrorText(){
        return this.passwordValidation() ? null :
            <Text style={styles.errorText}>Las contraseña debe tener más de 8 caracteres.</Text>;
    }

    passwordValidation() {
        return isValidPassword(this.state.password);
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
        return isValidBirthDate(this.state.birthDate);
    }

    onRegister() {
        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            fetch('http://taekwongo.herokuapp.com/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.creationInfo()),
            })
                .then(response => response.json())
                .then(response => checkStatus(response))
                .then(response => {
                    alert('El registro se ha completado exitosamente');
                    this.moveToLoginScreen();
                })
                .catch(error => {
                    alert('Ha habido un error. Pruebe más tarde');
                    console.log('Error en el el fetch: ' + error.message);
                });
        }
        else {
            alert("Complete todos los campos correctamente para registrarse");
        }
    }

    allFieldsCompleted(){
        return this.state.firstName !== undefined &&  this.state.lastName !== undefined && this.state.birthDate !== undefined && this.state.gender !== undefined && this.state.nationality !== undefined && this.state.email !== undefined && this.state.password !== undefined && this.state.confirmedPassword !== undefined
        && this.state.firstName !== "" &&  this.state.lastName !== "" && this.state.birthDate !== "" && this.state.gender !== "" && this.state.nationality !== "" && this.state.email !== "" && this.state.password !== "" && this.state.confirmedPassword !== "";
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

    moveToLoginScreen() {
        this.props.navigation.navigate('Login', {})
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
    registerView:{
        borderTopWidth:1,
        borderColor:'#a1a4a3',
        padding:15,
        backgroundColor: '#F5FCFF'
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