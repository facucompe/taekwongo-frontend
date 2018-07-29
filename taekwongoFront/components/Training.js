import React, { Component } from "react";
import {
    Container,
    Content,
    Text,
} from "native-base";
import {StyleSheet} from "react-native";

export default class Training extends Component {

    static navigationOptions = {
        title: 'Entrenamiento'
    };

    constructor(props){
        super(props);
    };

    render() {
        const training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={styles.titleText}>
                        {training.title}
                    </Text>
                    <Text>
                        Movimientos
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
    titleText:{
        fontWeight:'bold',
        color: 'black',
        fontSize:40,
    }
});