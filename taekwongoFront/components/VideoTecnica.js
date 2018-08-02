import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';


import Video from 'react-native-af-video-player'

export default class VideoTecnica extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.movementName}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);
        var movimientosEnum={"Ataque":0,"Defensa":1,"Contraataque":2,"Punio":3,"Patada":4,"Steps":5,"Cuerpo a_cuerpo":6}

        this.state = {
            listItems : [1,2,3,4,5,6,7,8]
        };
    }


    renderVideos = (video,i) => {
        return (
            <View style={styles.video}>
                <View style={styles.viewTextVideo}>
                    <Text style={styles.textVideo}>X Movimiento</Text>
                </View>
                <View>
                    <Video
                        url={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}/>
                </View>
            </View>
            )
    }

    render() {
        const movementName = this.props.navigation.getParam('movementName', 'No-POSSIBLE');
        return (
            <View style={styles.container}>
                <ScrollView>
                {this.state.listItems.map(this.renderVideos)}
                </ScrollView>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    video:{
        marginBottom:30,
        marginTop:30,
        borderBottomWidth:1,
        borderBottomColor:'#7F8C8D'
    },
    viewTextVideo:{
        marginBottom:10
    },
    textVideo:{
        fontWeight:'bold',
        fontSize:20
    }

});