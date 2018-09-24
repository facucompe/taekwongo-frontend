import React, {Component} from "react";
import {
    Button,
    Col,
    Container,
    Content,
    Footer,
    Grid,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Row,
    Text,
} from "native-base";
import {StyleSheet} from "react-native";

import moment from "moment";

import RegisterMeasurements from "./RegisterMeasurements";
import {iconNameFor, unitForTraining} from "./Commons";

export default class Training extends Component {

    static navigationOptions = {
        title: 'Entrenamiento'
    };

    constructor(props){
        super(props);

        this.training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            measurements: []
        };
    };

    componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/trainings/' + this.training.id + '/measurements',
            {
                method: 'GET',
                headers: {
                    authorization: this.session_token
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({measurements: response});
            })
            .catch(error => {
                alert('Error de conexión, intente nuevamente');
                console.log('Error en el el fetch: ' + error.message);
            });
    }

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
                                    name={iconNameFor(this.training)}
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
                                {this.registeredMeasurementsTitle()}
                            </Text>

                        </Row>
                        <Row>
                            {this.renderMeasurementsTable()}
                        </Row>
                    </Grid>
                </Content>
                <Footer style={styles.footer}>
                    <Left>
                        <Button onPress={() => this.openProgressGraph()} style={styles.actionButton}>
                            <Text> Ver Progreso </Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={() => this.continueTraining()} style={styles.actionButton}>
                            <Text> Entrenar </Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    renderMeasurementsTable() {
        return <List
            dataArray={this.state.measurements}
            renderRow={measurement =>
                <ListItem>
                    <Grid>
                        <Row>
                            <Col size={10}>
                                <Text >
                                    {moment(measurement.created_at).format("DD/MM/YYYY HH:mm:ss.SSS")}
                                </Text>
                            </Col>
                            <Col size={5}>
                                <Text >
                                    {measurement.magnitude} {unitForTraining(this.training)}
                                </Text>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            }
        />
    }

    continueTraining() {
        this.props.navigation.navigate('RegisterMeasurements', {session_token: this.session_token, selectedTraining: this.training })
    }

    openProgressGraph() {

    }

    registeredMeasurementsTitle() {
        return this.state.measurements.length > 0 ? "Mediciones registradas" : "Sin mediciones registradas";
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