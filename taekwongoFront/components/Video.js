import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Video extends Component {
    static navigationOptions = {
        title: 'Videos de Tecnica'
    }
    render() {
        return (
            <View>
                <Text>
                    Videos de tecnica component
                </Text>
            </View>
        );
    }
}