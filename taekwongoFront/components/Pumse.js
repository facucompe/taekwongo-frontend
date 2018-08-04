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

export default class Pumse extends Component {
    static navigationOptions = {
        title: 'Pumses'
    }

    constructor(props) {
        super(props);

        this.state = {
            formas : [1,2,3,4,5]
        }
        //Logic method
        this.onPressButton = this.onPressButton.bind(this);
    }

    renderFormas = (forma,i) => {
        return (
            <Button
                primary
                block
                style={styles.mbt30}
                onPress={() => this.onPressButton(forma)}
            >
                <Text style={styles.buttonText}>{forma}° forma</Text>
            </Button>
        )
    }


    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        {this.state.formas.map(this.renderFormas)}
                    </Form>
                </Content>
            </Container>
        );
    }
    onPressButton(forma){
        this.props.navigation.navigate('SpecificPumse')
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