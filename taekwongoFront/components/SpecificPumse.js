import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';

import Orientation from 'react-native-orientation'
import ImageZoom from 'react-native-image-pan-zoom';
import Video from 'react-native-af-video-player'

import Carousel from 'react-native-carousel-view';

export default class SpecificPumse extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        // Setup the header and tabBarVisible status
        const headerStatus = state.params && (state.params.fullscreen ? undefined : null)
        return {
        title: `${navigation.state.params.poomse.title}`,
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
    }

    renderVideos = (video,i) => {
        return (
            <View style={styles.myViewContainer}>
                <Video
                    style={styles.videoStyle}
                    url={video.link.url}
                    onFullScreen={status => this.onFullScreen(status)}/>
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
                    height={Dimensions.get('screen').height/1.5 }
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

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
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
        flex:1,
        width:undefined,
        height:undefined,
        resizeMode:'contain'
    },
    videoStyle:{
        flex:1
    }

});