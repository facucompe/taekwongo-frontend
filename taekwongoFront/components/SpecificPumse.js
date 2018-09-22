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

export default class SpecificPumse extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.poomse.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);
    }

    renderVideos = (video,i) => {
        return (
            <View style={styles.myViewContainer}>
                <Video
                    style={styles.videoStyle}
                    url={video.link.url}/>
            </View>
        )
    };

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
        const poomse = this.props.navigation.getParam('poomse', 'No-POSSIBLE');
        return (
            <View style={styles.container}>
                <Carousel
                    animate={false}
                    height={Dimensions.get('window').height/2}
                    indicatorSize={20}
                    indicatorColor="red"
                >
                    {poomse.images.map(this.renderImages)}
                    {poomse.videos.map(this.renderVideos)}
                </Carousel>
            </View>
        );
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