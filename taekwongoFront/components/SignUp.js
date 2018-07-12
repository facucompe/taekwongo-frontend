import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const param = this.props.navigation.getParam('hola', 'puto');
        return (
            <View>
                <Text>
                    {param}
                </Text>
            </View>
        );
    }
}