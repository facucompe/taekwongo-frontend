import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

export default class Video extends Component {
    static navigationOptions = {
        title: 'Videos de Técnica'
    }
    render() {
        return (
            <View>
                <Text>
                    Videos de técnica component
                </Text>
            </View>
        );
    }
}