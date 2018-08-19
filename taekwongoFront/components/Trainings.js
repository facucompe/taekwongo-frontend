import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body
} from "native-base";
import {StyleSheet} from "react-native";

import Training from "./Training";

const trainings = [
    {title: "Patada baja", date: "2018-07-25"},
    {title: "Golpe de puño fuerte", date: "2018-07-25"},
    {title: "Kaioken", date: "2018-07-25"},
    {title: "La gruya", date: "2018-07-25"},
    {title: "Hacer nada", date: "2018-07-25"}
];

export default class Trainings extends Component {

    static navigationOptions = {
        title: 'Entrenamientos'
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={trainings}
                        renderRow={training =>
                            <ListItem>
                                <Left>
                                    <Text>
                                        {training.date}{'\t\t\t\t\t'}{training.title}
                                    </Text>
                                </Left>
                                <Right>
                                        <Icon name="arrow-forward" onPress={this.moveTo(training)}/>
                                </Right>
                            </ListItem>}
                    />
                </Content>
            </Container>
        );
    }

    moveTo(training){
        this.props.navigation.navigate('Training', { training: training })
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