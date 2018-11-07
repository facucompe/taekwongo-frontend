import React, { Component } from 'react';

import {
    StyleSheet,
    View
} from 'react-native';

import { MultiLineChart } from 'react-native-d3multiline-chart'

export default class ProgressGraph extends Component {

    static navigationOptions = {
        title: 'Progreso'
    };

    constructor(props) {
        super(props);

        this.magnitudes = this.props.navigation.getParam('magnitudes','NO-MAGNITUDES');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');
    }

    /*render () {
        const magnitudes = this.magnitudes;

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'rgb(134, 65, 244)' }
                />
            ))
        };
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = Math.ceil((Math.max.apply(null, magnitudes) - Math.min.apply(null, magnitudes)) / 10);
        return (
            <View style={{ height: 200, padding: 20, flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                <YAxis
                    data={magnitudes}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={magnitudes}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                        <Decorator/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={magnitudes}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>
            </View>
        )
    }*/

    render() {
        //default data is available
        let data =[ [{
            "y": "202",
            "x": 2000
        }, {
            "y": "215",
            "x": 2001
        }, {
            "y": "179",
            "x": 2002
        }, {
            "y": "199",
            "x": 2003
        }, {
            "y": "134",
            "x": 2003
        }, {
            "y": "176",
            "x": 2010
        }],
            [{
                "y": "152",
                "x": 2000
            }, {
                "y": "189",
                "x": 2002
            }, {
                "y": "179",
                "x": 2004
            }, {
                "y": "199",
                "x": 2006
            }, {
                "y": "134",
                "x": 2008
            }, {
                "y": "176",
                "x": 2010
            }]
        ];
//default data is available
        let leftAxisData = [
            134,144,154,164,174,184,194,204,215
        ];
//default data is available
        let bottomAxisData = [
            2000,2002,2004,2006,2008,2010
        ];
        let legendColor = ['#00b7d4','red'];
        let legendText = ['sales','year'];
        let minX= 2000, maxX= 2010;
        let minY= 134, maxY= 215;

//since there are only two lines
        var Color = ['#00b7d4','red'];

        return (
            <View style={styles.container}>
                <MultiLineChart data= {data} leftAxisData= {leftAxisData} bottomAxisData= {bottomAxisData} legendColor= {legendColor}
                                legendText= {legendText} minX= {minX} maxX= {maxX} minY= {minY} maxY= {maxY} scatterPlotEnable= {false}   dataPointsVisible= {true} Color= {Color} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#FFFFFF',
    }
});