import React, { Component } from 'react';

import {
    Text,
    View
} from 'react-native';

export default class Rules extends Component {
    static navigationOptions = {
        title: 'Reglamento'
    }
    render() {
        return (
            <View>
                <Text>
                    Rules component
                </Text>
            </View>
        );
    }
}