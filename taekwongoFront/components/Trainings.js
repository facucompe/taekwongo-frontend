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

import moment from "moment";

export default class Trainings extends Component {

    static navigationOptions = {
        title: 'Entrenamientos'
    };

    constructor(props){
        super(props);

        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            trainings: []
        };

        this.openCreateTrainingView = this.openCreateTrainingView.bind(this);
        this.moveTo = this.moveTo.bind(this);
    };

    componentDidMount() {
        fetch('http://taekwongo.herokuapp.com/trainings',
            {
                method: 'GET',
                headers: {
                    authorization: this.session_token
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({trainings: response});
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
                    <List
                        dataArray={this.state.trainings}
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
                                                {moment(training.created_at).format("DD/MM/YYYY")}
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
        this.props.navigation.navigate('Training', {session_token: this.session_token, selectedTraining: training })
    }

    iconNameFor(training) {
        return training.training_type === "V" ? 'flash' : 'dumbbell';
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