import React, { Component } from 'react';

import {
    Text,
    View,
    Image
} from 'react-native';

export default class ItemNewsFeed extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Item`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });


    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.navigation.getParam('item', 'NO-ID');
        return (
            <View>
                <Text>
                    {item.title}
                </Text>
                <View>
                    <Text>
                        {item.body}
                    </Text>
                </View>
                <View>
                    <Image
                        source={{uri: item.picture_url}}
                    />
                </View>
            </View>
        );
    }
}
