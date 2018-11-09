import React, {Component} from 'react';

import {StyleSheet, AsyncStorage, Image} from 'react-native';
import moment from "moment";

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

import {NavigationActions} from 'react-navigation'
import {checkStatus, isValidBirthDate, isValidEmail, isValidName, matchBetween} from "./Commons";

export default class Profile extends Component {

    static navigationOptions = {
        title: 'Perfil',
        drawerLabel: 'Perfil',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/profile.png')}
                style={styles.icon}
            />
        ),
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
        };
        this.session_token = '';
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setBirthDate = this.setBirthDate.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.moveToChangeData = this.moveToChangeData.bind(this);
    }

    componentWillMount(){
        var _this = this;
        AsyncStorage.getItem("access_token").then(function (token){
            if (token) {
                fetch('http://taekwongo.herokuapp.com/users/me',
                    {
                        method: 'GET',
                        headers: {
                            authorization: token
                        }
                    })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        _this.setFirstName(response.first_name);
                        _this.setLastName(response.last_name);
                        _this.setBirthDate(new Date(response.birth_date));
                        _this.onValueChangeGender(response.gender);
                        _this.onValueChangeNationality(response.country.toLowerCase());
                        _this.setEmail(response.email);
                    })
                    .catch(error => {
                        alert('Error de conexión, intente nuevamente');
                        console.log('Error en el el fetch: ' + error.message);
                    });
                _this.session_token = token;
            }
            else {
                _this.moveToLoginScreen();
            }

        })

    }

    setFirstName(firstName){
        this.setState({firstName})
    }

    setLastName(lastName){
        this.setState({lastName})
    }

    setBirthDate(birthDate) {
        console.log(birthDate);
        this.setState({birthDate});
    }

    setEmail(email){
        this.setState({email})
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
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Nombre</Label>
                            <Input
                                value={this.state.firstName}
                                maxLength={30}
                                editable={false}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Apellido</Label>
                            <Input
                                value={this.state.lastName}
                                maxLength={30}
                                editable={false}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Nacionalidad</Label>
                            <Input
                                value={this.capitalize(this.state.nationality)}
                                maxLength={30}
                                editable={false}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Genero</Label>
                            <Input
                                value={this.formatGender(this.state.gender)}
                                maxLength={30}
                                editable={false}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Fecha de Nacimiento</Label>
                            <Input
                                value={moment.utc(this.state.birthDate).format('DD/MM/YYYY')}
                                maxLength={30}
                                editable={false}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'black'}}>Correo electrónico</Label>
                            <Input
                                onChangeText={this.setEmail}
                                value={this.state.email}
                                maxLength={40}
                                editable={false}
                            />
                        </Item>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={(this.moveToChangeData)}
                        >
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

    capitalize(str){
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
    }

    formatGender(gender) {
        if (gender) {
            if (gender === "male") {
                return "Masculino";
            }
            else if (gender === "female") {
                return "Femenino";
            }
            else {
                return "Otro";
            }
        }

        return gender;
    }

    moveToLoginScreen() {
        this.props.navigation.navigate('Login', {goToProfileScreen: true})
    }

    moveToChangeData() {
        this.props.navigation.navigate('ChangeData', {session_token: this.session_token})
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
    errorText:{
        color: 'red'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    },
    icon: {
        width: 24,
        height: 24,
    }
});