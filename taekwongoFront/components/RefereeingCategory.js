import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';


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
    }

    renderImages = (image,i) => {
        console.log(image);
        return (
            <View style={styles.myViewContainer}>
                <Image
                    style={styles.image}
                    source={{uri: image.link}}
                />
            </View>
        )
    };

    render() {
        const images = this.props.navigation.getParam('images', 'No-POSSIBLE');
        return (
            <View style={styles.container}>
                <Carousel
                    animate={false}
                    height={Dimensions.get('window').height/1.5}
                    indicatorSize={20}
                    indicatorColor="red"
                >
                    {images.map(this.renderImages)}
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