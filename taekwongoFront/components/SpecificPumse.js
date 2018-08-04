import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';


import Video from 'react-native-af-video-player'

import Carousel from 'react-native-carousel-view';

export default class SpecificPumse extends Component {

    static navigationOptions = ({ navigation }) => ({
        //title: `${movimientosEnum[navigation.state.params.movementName]}`,
        title: 'Un Pumse',
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);


        this.state = {
            listItems : [1,2,3,4,5,6,7,8],
            movements : []
        };
    }

    /*componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/movements?movement='+this.props.navigation.getParam('movementName', 'NO-ID'), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(response => {
                this.setState({movements: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }*/

    renderVideos = (video,i) => {
        return (
            <View style={[styles.videoContainer,(i < this.state.listItems.length -1) ? styles.borderVideo : styles.none]}>
                <View style={styles.video}>
                    <View style={styles.viewTextVideo}>
                        <Text style={styles.textVideo}>X Movimiento</Text>
                    </View>
                    <View>
                        <Video
                            url={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}/>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        //const movementName = this.props.navigation.getPar5am('movementName', 'No-POSSIBLE');
        return (
            <View style={styles.container}>
                <Carousel
                    animate={false}
                    height={500}
                    indicatorSize={20}
                    indicatorColor="red"
                >
                    <View style={styles.contentContainer}>
                        <Text>Page 1</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Video
                            url={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}/>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text>Page 3</Text>
                    </View>
                </Carousel>
            </View>
        );
    }
}


var styles = StyleSheet.create({
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