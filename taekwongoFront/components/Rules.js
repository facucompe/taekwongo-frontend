import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Button } from 'native-base';

export default class Rules extends Component {
    static navigationOptions = {
        title: 'Reglamento'
    }

    constructor(props) {
        super(props);
        this.state = {
            isNewVersionAvailable: false
        };
    }

    componentDidMount() {
		fetch('http://taekwongo.herokuapp.com/rules/isnewversionavailable', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
		}})
			.then(response => response.json())
			.then(response => {
				this.setState({isNewVersionAvailable: false});
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el fetch: ' + error.message);
			});
    }

    render() {
        if (this.state.isNewVersionAvailable) {
            alert("Hay una nueva versión disponible");
        }
        
        return (
            <View style={styles.margins}>
                <Button 
                primary
                block
                style={styles.mbt30}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textButton:{
        color:'white',
        fontSize: 20
    },
    mbt30: {
        marginBottom: 10,
        marginTop: 10
    },
    margins: {
        marginLeft: 40,
        marginRight: 40
    }
});