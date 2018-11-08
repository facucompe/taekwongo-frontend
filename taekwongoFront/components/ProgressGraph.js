import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Col, Container, Content, Grid, Icon, Row, Text} from 'native-base';
import {MultiLineChart} from 'react-native-d3multiline-chart';
import {iconNameFor, roundWithAmountOfDecimals, unitForTraining} from "./Commons";

const deviceWidth = Dimensions.get ('window').width;

export default class ProgressGraph extends Component {

    static navigationOptions = {
        title: 'Progreso'
    };

    constructor(props) {
        super(props);

        this.magnitudes = this.props.navigation.getParam('magnitudes','NO-MAGNITUDES');
        this.training = this.props.navigation.getParam('training','NO-TRAINING');
    }

    render() {
        let data =[ this.magnitudes.map((magnitude,i) => ({x: i+1, y: magnitude}))];
        let leftAxisData = this.magnitudes.map((magnitude) => (roundWithAmountOfDecimals(magnitude,0)));
        let bottomAxisData = this.magnitudes.map((magnitude,i) => (i+1));
        let legendColor = ['#00b7d4'];
        let legendText = ["golpes"];
        let minX= 1, maxX= this.magnitudes.length;
        let minY= this.minMagnitude()*0.75, maxY= this.maxMagnitude();
        let Color = ['#00b7d4'];

        //general data to represent ticks in y-axis and it doesn't take part in calculation
        let bottomAxisDataToShow = bottomAxisData;
        //general data to represent ticks in y-axis and it doesn't take part in calculation
        let leftAxisDataToShow = leftAxisData;

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
                            <Text style={styles.title2}>{`Mediciones en ${unitForTraining(this.training)}`}</Text>
                        </Row>
                        <Row>
                            <MultiLineChart
                                data={data}
                                leftAxisData={leftAxisData}
                                bottomAxisData={bottomAxisData}
                                legendColor={legendColor}
                                legendText={legendText}
                                minX={minX}
                                maxX={maxX}
                                minY={minY}
                                maxY={maxY}
                                scatterPlotEnable={false}
                                dataPointsVisible={true}
                                Color={Color}
                                bottomAxisDataToShow={bottomAxisDataToShow}
                                leftAxisDataToShow={leftAxisDataToShow}
                                circleLegendType={true}
                                fillArea={true}
                                yAxisGrid={false}
                                xAxisGrid={false}
                                hideXAxis={false}
                                hideYAxis={false}
                                inclindTick={false}
                                animation={true}
                                duration={1500}
                                delay={1000}
                                GraphHeight={300}
                                GraphWidth={deviceWidth}
                                chartWidth={deviceWidth - 20}
                                chartHeight={250}
                                staggerLength={220}
                                speed={50}
                            />
                        </Row>
                        <Row>
                            <Text style={styles.trainingData}>Mejor golpe: {this.magnitudeWithUnit(this.bestMagnitude())}</Text></Row>
                        <Row>
                            <Text style={styles.trainingData}>Promedio: {this.magnitudeWithUnit(this.averageMagnitude())}</Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }

    maxMagnitude() {
        return Math.max.apply(Math, this.magnitudes);
    }

    minMagnitude() {
        return Math.min.apply(Math, this.magnitudes);
    }

    magnitudeWithUnit(magnitude) {
        return `${magnitude} ${unitForTraining(this.training)} `;
    }

    bestMagnitude() {
        if(this.training.training_type === "F")
            return this.maxMagnitude();
        else
            return this.minMagnitude();

    }

    averageMagnitude() {
        let values = this.magnitudes;
        let sum = values.reduce((previous, current) => current += previous);
        let avg = sum / values.length;
        return roundWithAmountOfDecimals(avg,2);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF'
    },
    trainingData:{
        paddingLeft: 10,
        paddingBottom: 10
    },
    title:{
        color: 'black',
        paddingBottom: 50
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
        fontSize:24,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10
    }
});
