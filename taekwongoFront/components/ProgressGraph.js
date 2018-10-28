import React, { Component } from 'react';

import {
    View
} from 'react-native';

import {
    Grid,
    LineChart,
    XAxis,
    YAxis
} from 'react-native-svg-charts'

import { Circle } from 'react-native-svg'

export default class ProgressGraph extends Component {

    static navigationOptions = {
        title: 'Progreso'
    };

    constructor(props) {
        super(props);

        this.magnitudes = this.props.navigation.getParam('magnitudes','NO-MAGNITUDES');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');
    }

    render () {
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
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
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
    }
}