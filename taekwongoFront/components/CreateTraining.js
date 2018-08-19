import React, { Component } from "react";
import {
    Container,
    Content,
    Text,
} from "native-base";
import {StyleSheet} from "react-native";

export default class CreateTraining extends Component {

    static navigationOptions = {
        title: 'Crear Entrenamiento'
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Text>
                        Crear Entrenamiento
                    </Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF'
    },
    text:{
        color:'black'
    },
    image:{
        marginRight:10
    },
    itemText:{
        color:'black'
    },
    item:{
        flex:1,
        flexDirection:'row',
        padding:10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    titleText:{
        fontWeight:'bold'
    }
});