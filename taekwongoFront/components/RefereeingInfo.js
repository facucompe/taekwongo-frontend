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


export default class RefereeingInfo extends Component {
    static navigationOptions = {
        title: 'Categorias'
    }

    constructor(props) {
        super(props);

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
                            onPress={() => this.onPressButton('competitor')}
                        >
                            <Text style={styles.buttonText}>Competidor</Text>
                        </Button>

                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('techniques_allowed_areas')}
                        >
                            <Text style={styles.buttonText}>Tecnicas y areas permitidas</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('valid_points')}
                        >
                            <Text style={styles.buttonText}>Puntos validos</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('prohibited_acts_or_sanctions')}
                        >
                            <Text style={styles.buttonText}>Actos prohibidos o sanciones</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('decisions')}
                        >
                            <Text style={styles.buttonText}>Decisiones</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('video_replay')}
                        >
                            <Text style={styles.buttonText}>Video replay</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('signaling')}
                        >
                            <Text style={styles.buttonText}>Señalización</Text>
                        </Button>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.onPressButton('procedures')}
                        >
                            <Text style={styles.buttonText}>Procedimientos</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
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

    onPressButton(category){
        fetch('http://taekwongo.herokuapp.com/refeering?category='+category, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => this.checkStatus(response))
            .then(response => {
                this.props.navigation.navigate('RefereeingCategory', { categoryName: category,images:response })
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
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