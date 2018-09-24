import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { Button } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import RNFSPackage from 'react-native-fs';

export default class Rules extends Component {
    static navigationOptions = {
        title: 'Reglamento',
        drawerLabel: 'Reglamento',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/reglamento.png')}
                style={styles.icon}
            />
        ),
    };

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
                onPress={(downloadRules)}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
        );
    }             
}

function openRules() {        
    RNFSPackage.exists(taekwondoRulesDownloadPath)
    .then(function(doesFileExist) {
            if (doesFileExist) {
                openRulesPDF();
            } else {
                downloadRules().then(function() {
                    openRulesPDF();
                });
            }
        }
    ) 
} 

function openRulesPDF() {
    RNFetchBlob.android.actionViewIntent(taekwondoRulesDownloadPath, 'application/pdf')
}

function downloadRules() {
    const { config, fs } = RNFetchBlob;
    return config({
      fileCache : true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        mime : 'application/pdf',
        path: taekwondoRulesDownloadPath,
      }
    })
    .fetch('GET', 'http://www.worldtaekwondo.org/wp-content/uploads/2018/06/Revision-WT-Competition-Rules-Interpretation-Hammamet-040520181.pdf')
}

const taekwondoRulesDownloadPath = RNFetchBlob.fs.dirs.DownloadDir + '/taekwondo_rules.pdf';

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
    },
    icon: {
          width: 24,
          height: 24,
      }

});