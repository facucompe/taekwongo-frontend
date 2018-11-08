import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';
import {Button, Col, Container, Content, Footer, Grid, List, ListItem, Right, Row, Text} from "native-base";
import {checkStatus, unitForTraining} from "./Commons";

export default class MeasurementsConfirmation extends Component {

    static navigationOptions = {
        title: 'Confirmar Mediciones'
    };

    constructor(props) {
        super(props);

        this.training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');
        const allMeasurementMagnitudes = this.props.navigation.getParam('magnitudes','NO-MAGNITUDES');

        this.state = {
            magnitudes: allMeasurementMagnitudes.map(magnitude => this.convertedMagnitude(magnitude))
        };

        this.removeFromMagnitudes =  this.removeFromMagnitudes.bind(this);
    }

    render () {
        return (
            <Container style={styles.container}>
                <Content>
                    <List
                        dataArray={this.state.magnitudes}
                        renderRow={(magnitude) =>
                            <ListItem>
                                <Grid>
                                    <Row>
                                        <Col size={5}>
                                            <Text>
                                                {magnitude} {unitForTraining(this.training)}
                                            </Text>
                                        </Col>
                                        <Col size={5}>
                                            <Button
                                                primary
                                                block
                                                style={styles.mbt30}
                                                onPress={() => this.removeFromMagnitudes(magnitude)}>

                                                <Text style={styles.textButton}>Eliminar</Text>

                                            </Button>
                                        </Col>
                                    </Row>
                                </Grid>
                            </ListItem>
                        }
                    />
                </Content>
                <Footer>
                    <Right>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={() => this.saveMeasurementsInDatabase(this.state.magnitudes)}>
                            <Text style={styles.textButton}> Confirmar </Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        );
    }

    saveMeasurementsInDatabase(measurementMagnitudes){
        fetch(`http://taekwongo.herokuapp.com/trainings/${this.training.id}/measurements/` , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: this.session_token
            },
            body: JSON.stringify(this.creationInfo(measurementMagnitudes)),
        })
            .then(response => response.json())
            .then(response => checkStatus(response))
            .catch(error => {
                alert('Ha habido un error. Pruebe más tarde');
                console.log('Error en el el fetch: ' + error.message);
            }).then(() => this.moveBackToTraining());
    }

    creationInfo(measurementMagnitudes) {
        return {
            measurements:
                measurementMagnitudes.map(measurementMagnitude => ({magnitude: measurementMagnitude}))

        }

    }

    convertedMagnitude(measurementMagnitude){
        return (parseFloat(measurementMagnitude) * this.conversionFactor()).toFixed(2).toString()
    }

    conversionFactor(){
        return this.training.training_type === "F" ? (9.81 / 16384.0) : 1;
    }

    removeFromMagnitudes(aMagnitude) {
        var newMagnitudes = [...this.state.magnitudes];
        remove(newMagnitudes,aMagnitude);
        this.setState({magnitudes: newMagnitudes});
    }

    moveBackToTraining() {
        this.props.navigation.navigate('Training', {session_token: this.session_token, selectedTraining: this.training})
    }
}

function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

const styles = StyleSheet.create({
    textButton: {
        color: 'white',
        fontSize: 20
    },
    mbt30: {
        marginBottom: 10,
        marginTop: 10
    },
    margins: {
        marginLeft: 40,
        marginRight: 40
    },
    icon: {
        width: 24,
        height: 24,
    },
    container: {
        backgroundColor: '#FFFFFF'
    }

});