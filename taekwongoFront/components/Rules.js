import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class Rules extends Component {
    static navigationOptions = {
        title: 'Reglamento',
        drawerLabel: 'Reglamento',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/reglamento.png')}
                style={styles.icon}
            />
        ),
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


const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});