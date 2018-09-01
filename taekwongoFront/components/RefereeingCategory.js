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

const categoryEnum={
    "competitor":"Competidor",
    "techniques_allowed_areas":"Tecnicas y areas permitidas",
    "valid_points":"Puntos validos",
    "prohibited_acts_or_sanctions":"Actos prohibidos o sanciones",
    "decisions":"Decisiones",
    "video_replay":"Video replay",
    "signaling":"Señalización",
    "procedures":"Procedimientos"};

export default class RefereeingCategory extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${categoryEnum[navigation.state.params.categoryName]}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);
    }

    render() {
        const movementName = this.props.navigation.getParam('categoryName', 'No-POSSIBLE');
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Text>{movementName}</Text>
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