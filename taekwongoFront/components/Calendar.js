import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

export default class Calendar extends Component {
    static navigationOptions = {
        title: 'Calendario'
    }
    render() {
        return (
            <View>
                <Text>
                    Calendar component
                </Text>
            </View>
        );
    }
}