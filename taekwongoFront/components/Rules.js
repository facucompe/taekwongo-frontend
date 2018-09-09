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
    }

    render() {        
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
                onPress={() => downloadRules(false)}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
        );
    }             
}

function openRules() {        
    RNFSPackage.exists(path)
    .then(function(doesFileExist) {
            if (doesFileExist) {
                openRulesPDF();
            } else {
                downloadRules(!doesFileExist);
            }
        }
    ) 
} 

function openRulesPDF() {
    RNFetchBlob.android.actionViewIntent(path, 'application/pdf')
}

function downloadRules(shouldOpen) {
    const { config, fs } = RNFetchBlob;
    config({
      fileCache : true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        mime : 'application/pdf',
        path: path,
      }
    })
    .fetch('GET', 'http://www.worldtaekwondo.org/wp-content/uploads/2018/06/Revision-WT-Competition-Rules-Interpretation-Hammamet-040520181.pdf')
    .then(function() {
        if(shouldOpen) {
            openRulesPDF()  
        }
    });
}

const path = RNFetchBlob.fs.dirs.DownloadDir + '/taekwondo_rules.pdf'

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