import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Alert,
    Picker
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';

import DatePicker from 'react-native-datepicker';

export default class SignUp extends Component {

    static navigationOptions = {
        title: 'Registrarme'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            gender: '',
            nationality: '',
            user: '',
            password: '',
            confirmedPassword: ''
        };

        this.onRegister = this.onRegister.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({firstName: text})}
                            placeholder={'Nombre'}
                            value={this.state.firstName}
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                            padding={7}
                            height={30}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({lastName: text})}
                            value={this.state.lastName}
                            placeholder={'Apellido'}
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                            padding={7}
                            height={30}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <DatePicker
                            style={{width: 330}}
                            date={this.state.birthDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="1900-00-01"
                            maxDate="2020-11-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 5
                                },
                                dateInput: {
                                    marginLeft: 40
                                }
                            }}
                            onDateChange={(dateString) => {this.setState({birthDate: new Date(dateString)})}}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <Picker style={styles.dropdownList}
                                selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                            <Picker.Item label="Masculino" value="m" />
                            <Picker.Item label="Femenino" value="f" />
                            <Picker.Item label="Otro" value="o" />
                        </Picker>
                    </View>
                    <View style={styles.borderInput}>
                        <Picker style={styles.dropdownList}
                                selectedValue={this.state.nationality}
                                onValueChange={(itemValue, itemIndex) => this.setState({nationality: itemValue})}>
                            <Picker.Item label="Argentina" value="argentina" />
                            <Picker.Item label="Brasil" value="brasil" />
                            <Picker.Item label="Otro" value="otro" />
                        </Picker>
                    </View>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({user: text})}
                            placeholder={'Correo electrónico'}
                            value={this.state.user}
                            maxLength={30}
                            underlineColorAndroid={'transparent'}
                            padding={7}
                            height={30}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            placeholder={'Contraseña'}
                            maxLength={100}
                            underlineColorAndroid={'transparent'}
                            padding={7}
                            height={30}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.borderInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({confirmedPassword: text})}
                            value={this.state.confirmedPassword}
                            placeholder={'Confirmar contraseña'}
                            maxLength={100}
                            underlineColorAndroid={'transparent'}
                            padding={7}
                            height={30}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttonAndHelp}>
                        <TouchableHighlight onPress={(this.onRegister)} style={styles.button}>
                            <Text style={styles.textButton}>Registrarme</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.registerView}>
                    <Text style={styles.registerText}>¿Ya estás registrado? <Text style={styles.registerPress} onPress={this.logIn}>Inicia sesión</Text></Text>
                </View>
            </View>
        );
    }

    onRegister(){
        if(!isValidName(this.state.firstName)){
            alert("Completar nombre solamente con letras y apóstrofes.")
        }
        else {

            if (!isValidName(this.state.lastName)) {
                alert("Completar apellido solamente con letras y apóstrofes.")
            }

            else {

                if(!isValidBirthDate(this.state.birthDate)){
                    alert("La fecha de nacimiento debe ser anterior al día de hoy.")
                }
                else{

                    if(!isValidEmail(this.state.user)){
                        alert("Formato incorrecto en Correo Electrónico");
                    }
                    else{
                        if (this.state.password !== this.state.confirmedPassword) {
                            alert("Las contraseñas ingresadas no coinciden.")
                        }
                        else {
                            alert("Las contraseñas ingresadas coinciden. :)")
                            //To Do: Sacar el alert y hacer el POST al backend para registrar el usuario
                        }
                    }
                }
            }
        }
    }

    logIn(){
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
        fontWeight:'bold'
    },
    dropdownList:{
        height: 30
    }
});