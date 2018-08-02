import React, { Component } from 'react';

import {
    Text,
    View,
} from 'react-native';

export default class ItemNewsFeed extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.itemTitle}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });


    constructor(props) {
        super(props);
    }

    render() {
        const param = this.props.navigation.getParam('itemId', 'NO-ID');
        return (
            <View>
                <Text>
                    {param}
                </Text>
            </View>
        );
    }
}
