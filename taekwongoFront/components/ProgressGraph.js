import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Container, Content, Text, Title} from 'native-base';
import {MultiLineChart} from 'react-native-d3multiline-chart';
import {unitForTraining} from "./Commons";


const deviceWidth = Dimensions.get ('window').width;
const deviceHeight = Dimensions.get ('window').height;

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
        let leftAxisData = this.magnitudes;
        let bottomAxisData = this.magnitudes.map((magnitude,i) => (i+1));
        let legendColor = ['#00b7d4'];
        let legendText = ["golpes"];
        let minX= 1, maxX= this.magnitudes.length;
        let minY= this.minMagnitude()*0.75, maxY= this.maxMagnitude();
        let Color = ['#00b7d4'];

        //general data to represent ticks in y-axis and it doesn't take part in calculation
        let bottomAxisDataToShow = this.magnitudes.map((magnitude,i) => (i+1));
        //general data to represent ticks in y-axis and it doesn't take part in calculation
        let leftAxisDataToShow = this.magnitudes.map((magnitude) => magnitude);

        return (
            <Container style={styles.container}>
                <Content>
                    <Title style={styles.title}>{`Mediciones en ${unitForTraining(this.training)}`}</Title>
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
                    <Text style={styles.trainingData}>Mejor golpe: {this.magnitudeWithUnit(this.bestMagnitude())}</Text>
                    <Text style={styles.trainingData}>Promedio: {this.magnitudeWithUnit(this.averageMagnitude())}</Text>
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
        return Math.round(sum * 100 / values.length) /100
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
        paddingTop: 100

    },
    trainingData:{
        paddingLeft: 10
    },
    title:{
        color: 'black',
        paddingBottom: 50
    }
});