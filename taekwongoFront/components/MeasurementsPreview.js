import React, { Component } from 'react';

import {
    View
} from 'react-native';
import {Button, Col, Grid, List, ListItem, Row, Text} from "native-base";
import moment from "moment";
import {unitForTraining} from "./Commons";

export default class MeasurementsPreview extends Component {

    static navigationOptions = {
        title: 'Confirmar mediciones'
    };

    constructor(props) {
        super(props);

        this.training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            magnitudes: this.props.navigation.getParam('magnitudes','NO-MAGNITUDES')
        }
    }

    render () {
        const magnitudes = this.magnitudes;

        return <List
            dataArray={this.state.magnitudes}
            renderRow={(magnitude,section,rowIndex) =>
                <ListItem>
                    <Grid>
                        <Row>
                            <Col size={5}>
                                <Text >
                                    {magnitude} {unitForTraining(this.training)}
                                </Text>
                            </Col>
                            <Col size={5}>
                                <Button
                                    primary
                                    block
                                    style={styles.mbt30}
                                    onPress={() => this.setState({magnitudes: this.magnitudesWithoutTheOneIn(rowIndex)})}>
                                    <Text style={styles.textButton}>Conectar</Text>
                                </Button>;
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            }
        />
    }

    magnitudesWithoutTheOneIn(aRowIndex) {
        return this.state.magnitudes.splice(aRowIndex,1);
    }
}