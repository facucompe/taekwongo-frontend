import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';


import Video from 'react-native-af-video-player'
import {checkStatus} from "./Commons";

const movimientosEnum={
    "attack":"Ataque",
    "defense":"Defensa",
    "counterattack":"Contraataque",
    "fist":"Puño",
    "kick":"Patada",
    "steps":"Steps",
    "body_to_body":"Cuerpo a Cuerpo"};

export default class VideoTecnica extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${movimientosEnum[navigation.state.params.movementName]}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            movements : []
        };
    }

    componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/video_techniques?category='+this.props.navigation.getParam('movementName', 'NO-ID'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => checkStatus(response))
            .then(response => {
                this.setState({movements: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

    renderVideos = (video,i) => {
        return (
            <View style={[styles.videoContainer,(i < this.state.movements.length -1) ? styles.borderVideo : styles.none]}>
                <View style={styles.video}>
                    <View style={styles.viewTextVideo}>
                        <Text style={styles.textVideo}>{video.title}</Text>
                    </View>
                    <View>
                        <Video
                            url={video.link.url}/>
                    </View>
                </View>
            </View>
            )
    };

    render() {
        const movementName = this.props.navigation.getParam('movementName', 'No-POSSIBLE');
        return (
            <View style={styles.container}>
                <ScrollView>
                {this.state.movements.map(this.renderVideos)}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#FFF'
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

});