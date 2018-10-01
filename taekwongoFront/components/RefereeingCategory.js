import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';


import Video from 'react-native-af-video-player'

import Carousel from 'react-native-carousel-view';

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
        this.state = {
            images : []
        };
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
        fetch('http://taekwongo.herokuapp.com/refeering?category='+this.props.navigation.getParam('categoryName', 'NO-ID'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => this.checkStatus(response))
            .then(response => {
                this.setState({images: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    renderImages = (image,i) => {
        return (
            <View style={styles.myViewContainer}>
                <Image
                    style={styles.image}
                    source={{uri: image.link.url}}
                />
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    animate={false}
                    height={Dimensions.get('window').height/2}
                    indicatorSize={20}
                    indicatorColor="red"
                >
                    {this.state.images.map(this.renderImages)}
                </Carousel>
            </View>
        );
    }

    onPressButton(){
        this.props.navigation.navigate('RefereeingInfo')
    }
}

let styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#000'
    },
    myViewContainer:{
        flex:1,
        backgroundColor:'#000'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    borderVideo:{
        borderBottomWidth: 1,
        borderBottomColor: '#a1a4a3'
    },
    videoContainer:{
        marginLeft:10,
        marginRight:10
    },
    none:{

    },
    video:{
        marginTop:20,
        marginBottom:30,
    },
    viewTextVideo:{
        marginBottom:10
    },
    textVideo:{
        fontWeight:'bold',
        fontSize:20
    },
    image:{
        alignSelf:'stretch',
        flex:1
    },
    videoStyle:{
        flex:1
    }

});