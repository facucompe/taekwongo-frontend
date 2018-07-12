import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';


export default class ItemFeed extends Component {

    static navigationOptions = {
        title: 'Item'
    }


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
