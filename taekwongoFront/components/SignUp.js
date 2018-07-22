import React, { Component } from 'react';

import {
    StyleSheet,
    View
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';

import {
    Button,
    Col,
    Container,
    Content,
    DatePicker,
    Footer,
    Form,
    Grid,
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
            birthDate: undefined,
            gender: 'm',
            nationality: 'argentina',
            user: undefined,
            password: undefined,
            confirmedPassword: undefined,
            validatingFirstName: false,
            validatingLastName: false,
            validatingBirthDate: false,
            validatingGender: false,
            validatingNationality: false,
            validatingUser: false,
            validatingPassword: false,
            validatingConfirmedPassword: false
        };

        this.onRegister = this.onRegister.bind(this);
        this.logIn = this.logIn.bind(this);

        this.renderFirstNameError = this.renderFirstNameError.bind(this);
        this.renderLastNameError = this.renderLastNameError.bind(this);
        this.renderUserError = this.renderUserError.bind(this);
        this.renderPasswordError = this.renderPasswordError.bind(this);
        this.renderConfirmedPasswordCheck = this.renderConfirmedPasswordCheck.bind(this);
        this.renderConfirmedPasswordErrorText = this.renderConfirmedPasswordErrorText.bind(this);
        this.renderPasswordErrorText = this.renderPasswordErrorText.bind(this);

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setBirthDate = this.setBirthDate.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmedPassword = this.setConfirmedPassword.bind(this);

        this.firstNameValidation = this.firstNameValidation.bind(this);
        this.lastNameValidation = this.lastNameValidation.bind(this);
        this.birthDateValidation = this.birthDateValidation.bind(this);
        this.userValidation = this.userValidation.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.confirmedPasswordValidation = this.confirmedPasswordValidation.bind(this);
    }

    setFirstName(aFirstName){
        this.setState({firstName: aFirstName, validatingFirstName: true })
    }

    setLastName(aLastName){
        this.setState({lastName: aLastName, validatingLastName: true })
    }

    setBirthDate(aDate) {
        this.setState({ birthDate: aDate, validatingBirthDate: true });
    }

    setUser(aUser){
        this.setState({user: aUser, validatingUser:true})
    }

    setPassword(aPassword){
        this.setState({password: aPassword, validatingPassword:true})
    }

    setConfirmedPassword(aPassword){
        this.setState({confirmedPassword: aPassword, validatingConfirmedPassword:true})
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
                                        <Picker.Item label="Otro" value="otro" />
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
                                <Picker.Item label="Masculino" value="m" />
                                <Picker.Item label="Femenino" value="f" />
                                <Picker.Item label="Otro" value="o" />
                            </Picker>

                            <Item floatingLabel error={!this.userValidation()}>
                                <Label>Correo electrónico</Label>
                                <Input
                                    onChangeText={this.setUser}
                                    value={this.state.user}
                                    maxLength={30}
                                />
                                {this.renderUserError()}
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
        if (!this.firstNameValidation()) {
            return <Icon name='close-circle' />;
        }

        return null;
    }

    firstNameValidation() {
        return !this.state.validatingFirstName || isValidName(this.state.firstName);
    }

    renderLastNameError(){
        if (!this.lastNameValidation()) {
            return <Icon name='close-circle' />;
        }
        return null;
    }

    lastNameValidation() {
        return !this.state.validatingLastName || isValidName(this.state.lastName);
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

    renderPasswordError(){
        if (!this.passwordValidation())

            return <Icon name='close-circle' />;

        else

            return null;
    }

    renderPasswordErrorText(){
        if (!this.passwordValidation())

            return <Text style={styles.errorText}>Las contraseña debe tener más de 8 caracteres.</Text>;

        else

            return null;
    }

    passwordValidation() {
        return !this.state.validatingPassword || isValidPassword(this.state.password);
    }

    renderConfirmedPasswordCheck(){
        if (!this.confirmedPasswordValidation()) {

            return <Icon name='close-circle' color='green' />;
        }

        else{
            if(this.state.confirmedPassword !== undefined && this.state.confirmedPassword.length>0){
                return <Icon name='checkmark-circle' />;
            }
            else
                return null;

        }
    }

    renderConfirmedPasswordErrorText(){
        if (!this.confirmedPasswordValidation())

            return <Text style={styles.errorText}>Las contraseñas ingresadas no coinciden.</Text>;

        else
            return null

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
            //To Do: Sacar el alert y hacer el POST al backend para registrar el usuario
        }
        else {
            alert("Corregir campos inválidos");
        }

    }

    allFieldsCompleted(){
        return this.state.firstName !== undefined &&  this.state.lastName !== undefined && this.state.birthDate !== undefined && this.state.gender !== undefined && this.state.nationality !== undefined && this.state.user !== undefined && this.state.password !== undefined && this.state.confirmedPassword !== undefined;
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
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});