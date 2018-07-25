import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

export default class Refereeing extends Component {
    static navigationOptions = {
        title: 'Arbitraje'
    }
    render() {
        return (
            <View>
                <Text>
                    Arbitraje component
                </Text>
            </View>
        );
    }
}