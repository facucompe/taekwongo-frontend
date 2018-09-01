import React, { Component } from 'react';

import {
    StyleSheet,
    Image
} from 'react-native';

import {
    Button,
    Container,
    Content,
    Form,
    Text,
    Card,
    CardItem,
    Left,
    Body,
    Thumbnail
} from 'native-base';


export default class Refereeing extends Component {
    static navigationOptions = {
        title: 'Arbitraje'
    }

    constructor(props) {
        super(props);

        this.state = {
            changes : [0,1,2]
        };
        //Logic method
        this.onPressButton = this.onPressButton.bind(this);
    }

    checkStatus(response) {
        if (response.status === undefined || (response.status >= 200 && response.status < 300)) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/refereeing', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => this.checkStatus(response))
            .then(response => {
                this.setState({changes: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    renderChanges = (change,i) => {
        return (
            <Card style={{flex: 0, marginTop:10}}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://image.ibb.co/mqPwkK/TAEKWONGO.png'}} />
                        <Body>
                        <Text>Cambio en Arbitraje</Text>
                        <Text note>15/05/2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                    <Image source={{uri: 'http://442.perfil.com/wp-content/uploads/2011/03/0301_riquelme_telam_g-650x446.jpg'}} style={{height: 200, width:'100%',flex: 1}}/>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis
                    </Text>
                    </Body>
                </CardItem>
            </Card>
        )
    };

    render() {
        return (

            <Container>
                <Content padder>
                    <Form>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton()}
                        >
                            <Text style={styles.buttonText}>Ver Información</Text>
                        </Button>

                        {this.state.changes.map(this.renderChanges)}
                    </Form>
                </Content>
            </Container>

        );
    }

    onPressButton(){
        this.props.navigation.navigate('RefereeingInfo')
    }
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
    mbt30: {
        marginBottom: 10,
        marginTop: 10
    },
    mb150t30: {
        marginBottom: 180,
        marginTop: 30
    }
});