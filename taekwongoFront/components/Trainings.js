import React, { Component } from "react";
import {
    Container,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Grid,
    Col,
    Row,
    Right,
    Footer
} from "native-base";

import {StyleSheet} from "react-native";

import Training from "./Training";

const trainings = [
    {title: "Patada baja", date: "2018-07-25", type: "V"},
    {title: "Golpe de puño fuerte", date: "2018-07-25", type: "F"},
    {title: "Kaioken", date: "2018-07-25", type:"F"},
    {title: "La gruya", date: "2018-07-25", type: "V"},
    {title: "Hacer nada", date: "2018-07-25", type:"F"}
];

export default class Trainings extends Component {

    static navigationOptions = {
        title: 'Entrenamientos'
    };

    constructor(props){
      super(props);

      this.openCreateTrainingView = this.openCreateTrainingView.bind(this);
      this.moveTo = this.moveTo.bind(this);
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={trainings}
                        renderRow={training =>
                            <ListItem button onPress={() => {this.moveTo(training)}}>
                                <Grid>
                                    <Row>
                                        <Col size={1}>
                                            <Icon type={"MaterialCommunityIcons"} name={this.iconNameFor(training)}/>
                                        </Col>
                                        <Col size={8}>
                                            <Text >
                                                {training.title}
                                            </Text>
                                        </Col>
                                        <Col size={4}>
                                            <Text>
                                                {training.date}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Grid>
                            </ListItem>}
                    />
                </Content>
                <Footer style={styles.footer}>
                    <Right>
                        <Button onPress={this.openCreateTrainingView} rounded style={styles.plusButton}>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    moveTo(training){
        this.props.navigation.navigate('Training', { selectedTraining: training })
    }

    iconNameFor(training) {
        if(training.type === "V"){
            return 'flash'
        }
        else
            return 'dumbbell'
    }

    openCreateTrainingView() {
        this.props.navigation.navigate('CreateTraining', {})
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
    },
    footer:{
        backgroundColor: '#F5FCFF'
    },
    plusButton:{
        backgroundColor: '#2666ff',
        marginRight: 10,
        marginBottom: 10
    }
});