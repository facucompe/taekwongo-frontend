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

export default class VideoMenu extends Component {
    static navigationOptions = {
        title: 'Videos de Tecnica'
    }

    constructor(props) {
        super(props);

        //Logic methods
        this.onPressButton = this.onPressButton.bind(this);
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('attack')}
                >
                    <Text style={styles.buttonText}>Ataque</Text>
                </Button>

                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('defense')}
                >
                    <Text style={styles.buttonText}>Defensa</Text>
                </Button>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('counterattack')}
                >
                    <Text style={styles.buttonText}>Contraataque</Text>
                </Button>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('fist')}
                >
                    <Text style={styles.buttonText}>Puño</Text>
                </Button>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('kick')}
                >
                    <Text style={styles.buttonText}>Patada</Text>
                </Button>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('steps')}
                >
                    <Text style={styles.buttonText}>Steps</Text>
                </Button>
                <Button
                    primary
                    block
                    style={styles.mbt30}
                    onPress={() => this.onPressButton('body_to_body')}
                >
                    <Text style={styles.buttonText}>Cuerpo a cuerpo</Text>
                </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    onPressButton(movimiento){
        this.props.navigation.navigate('VideoTechnique', { movementName: movimiento })
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