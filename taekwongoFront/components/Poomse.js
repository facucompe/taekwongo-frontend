import React, { Component } from 'react';

import {
    StyleSheet,
} from 'react-native';

import {
    Button,
    Container,
    Content,
    Form,
    Text
} from 'native-base';

export default class Poomse extends Component {
    static navigationOptions = {
        title: 'Poomses'
    };

    constructor(props) {
        super(props);

        this.state = {
            poomses : []
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
        fetch('http://taekwongo.herokuapp.com/poomses', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => this.checkStatus(response))
            .then(response => {
                this.setState({poomses: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    renderPoomses = (poomse,i) => {
        return (
            <Button
                primary
                block
                style={styles.mbt30}
                onPress={() => this.onPressButton(poomse)}
            >
                <Text style={styles.buttonText}>{poomse.title}</Text>
            </Button>
        )
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        {this.state.poomses.map(this.renderPoomses)}
                    </Form>
                </Content>
            </Container>
        );
    }
    onPressButton(somePoomse){
        this.props.navigation.navigate('SpecificPumse', {poomse: somePoomse})
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