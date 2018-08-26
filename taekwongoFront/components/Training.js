import React, { Component } from "react";
import {
    Button,
    Col,
    Container,
    Content, Footer, Grid, Icon, List, ListItem, Right, Left, Row,
    Text,
} from "native-base";
import {StyleSheet} from "react-native";

const measurements = [
    {timestamp: "2018-07-25 15:00:00", magnitude: 5},
    {timestamp: "2018-07-25 15:30:00", magnitude: 10},
    {timestamp: "2018-07-26 08:20:15", magnitude: 12.5},
    {timestamp: "2018-07-27 08:15:08", magnitude: 13},
    {timestamp: "2018-07-28 23:59:50", magnitude: 20},
    {timestamp: "2018-07-28 23:59:55", magnitude: 18}
];

export default class Training extends Component {

    static navigationOptions = {
        title: 'Entrenamiento'
    };

    constructor(props){
        super(props);

        this.training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
    };

    render() {

        return (
            <Container style={styles.container}>
                <Content>
                    <Grid>
                        <Row>
                            <Col size={1}>
                                <Icon
                                    style={styles.icon}
                                    type={"MaterialCommunityIcons"}
                                    name={this.iconNameFor(this.training)}
                                />
                            </Col>
                            <Col size={8}>
                                <Text style={styles.titleText}>
                                    {this.training.title}
                                </Text>
                            </Col>
                        </Row>
                        <Row>
                            <Text style={styles.title2}>
                                Mediciones registradas
                            </Text>

                        </Row>
                        <Row>
                            {this.renderMeasurementsTable()}
                        </Row>
                    </Grid>
                </Content>
                <Footer style={styles.footer}>
                    <Left>
                        <Button onPress={this.openProgressGraph()} style={styles.actionButton}>
                            <Text> Ver Progreso </Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={this.continueTraining()} style={styles.actionButton}>
                            <Text> Entrenar </Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    iconNameFor(training) {
        if(training.type === "V"){
            return 'flash'
        }
        else
            return 'dumbbell'
    }

    renderMeasurementsTable() {
        return <List
            dataArray={measurements}
            renderRow={measurement =>
                <ListItem>
                    <Grid>
                        <Row>
                            <Col size={10}>
                                <Text >
                                    {measurement.timestamp}
                                </Text>
                            </Col>
                            <Col size={5}>
                                <Text >
                                    {measurement.magnitude} {this.unitFor(measurement)}
                                </Text>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            }
        />
    }

    continueTraining() {

    }

    openProgressGraph() {

    }

    unitFor(measurement) {
        return this.training.type === 'V' ? 'ms' : 'm/s^2';
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF'
    },
    icon:{
        fontSize: 40
    },
    titleText:{
        fontWeight:'bold',
        color: 'black',
        fontSize:40,
    },
    title2:{
        fontWeight:'bold',
        color: 'black',
        fontSize:20,
        marginTop:20,
        padding: 5
    },
    footer:{
        backgroundColor: '#F5FCFF'
    },
    actionButton:{
        backgroundColor: '#2666ff',
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10
    }
});