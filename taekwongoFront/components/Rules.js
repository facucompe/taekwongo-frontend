import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import { Button } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import RNFSPackage from 'react-native-fs';

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
                style={styles.mbt30}
                onPress={(openRules)}>
                    <Text style={styles.textButton}>Abrir Reglamento</Text>
                </Button>
                <Button 
                primary
                block
                style={styles.mbt30}
                onPress={(downloadRules)}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
        );
    }             
}

function openRules() {        
    RNFSPackage.exists(RNFetchBlob.fs.dirs.DownloadDir + '/taekwondo_rules.pdf')
    .then(function(doesFileExist) {
            if (doesFileExist) {
                // openRulesPDF();
            } else {
                downloadRules();
            }
        }
    ) 
} 

function downloadRules() {
    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    config({
      fileCache : true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        mime : 'application/pdf',
        path: downloads + '/taekwondo_rules.pdf',
      }
    })
    .fetch('GET', 'http://www.worldtaekwondo.org/wp-content/uploads/2018/06/Revision-WT-Competition-Rules-Interpretation-Hammamet-040520181.pdf');
}

function openRulesPDF() {
    var source = RNFetchBlob.fs.dirs.DownloadDir + '/taekwondo_rules.pdf';

    return <Pdf source={source}/>
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