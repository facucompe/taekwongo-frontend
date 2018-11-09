import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';

import Orientation from 'react-native-orientation'
import Video, {ScrollView,Container} from 'react-native-af-video-player'
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
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        // Setup the header and tabBarVisible status
        const headerStatus = state.params && (state.params.fullscreen ? undefined : null)
        return {
            title: `${movimientosEnum[navigation.state.params.movementName]}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
          // For stack navigators, you can hide the header bar like so
          header:headerStatus,
        }
      }

      onFullScreen(status) {
        // Set the params to pass in fullscreen status to navigationOptions
        this.props.navigation.setParams({
          fullscreen: !status
        })
        if(!status){//Vertical, saca la pantalla grande
            Orientation.lockToPortrait();
        }else{//Horizontal
            Orientation.lockToLandscape();
        }
      }

    constructor(props) {
        super(props);
        this.onFullScreen(false)
        this.state = {
            movements : []
        };
    }

    componentWillMount() {  
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
            <Container style={[styles.videoContainer,(i < this.state.movements.length -1) ? styles.borderVideo : styles.none]}>
                    <View style={styles.viewTextVideo}>
                        <Text style={styles.textVideo}>{video.title}</Text>
                    </View>
            <Video style={{marginBottom:30}}
            url={video.link.url}
            onFullScreen={status => this.onFullScreen(status)}/>
            </Container>
            )
    };

    render() {
        const movementName = this.props.navigation.getParam('movementName', 'No-POSSIBLE');
        return (
                <ScrollView style={styles.container}>
                {this.state.movements.map(this.renderVideos)}
                </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF'
    },
    borderVideo:{
        borderBottomWidth: 1,
        borderBottomColor: '#a1a4a3'
    },
    videoContainer:{
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    none:{

    },
    viewTextVideo:{
        marginBottom:10
    },
    textVideo:{
        fontWeight:'bold',
        fontSize:20
    },

});