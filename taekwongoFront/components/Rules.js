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
                onPress={(downloadRules)}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
        );
    }             
}

function getLastVersion() {
    return fetch('http://taekwongo.herokuapp.com/rulespdf', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}

function openRules() {
    RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir)
    .then(function(files){
        var rules = files.filter(function(file) {
            return file.includes("taekwondo_rules_");
        })

        var lastVersionDownloaded = rules.sort(function(file1, file2){
            return file1 < file2;
        })[0]

        if (lastVersionDownloaded !== undefined) {
            openRulesPDF(lastVersionDownloaded);
        } else {
            getLastVersion().then(function(rules){
                downloadRulesPDF(rules).then(function() {
                    var lastVersionFileName = "taekwondo_rules_" + rules.version + '.pdf' 
                    openRulesPDF(lastVersionFileName);
                })
            });
        }
    }); 
} 

function openRulesPDF(rulesName) {
    var rulesPath = taekwondoRulesDownloadPath + rulesName;
    RNFetchBlob.android.actionViewIntent(rulesPath, 'application/pdf')
}

function downloadRules() {
    getLastVersion().then(function(rules){
        downloadRulesPDF(rules)
    })
}

function downloadRulesPDF(rules) {
    const { config, fs } = RNFetchBlob;    
    var lastVersionFileName = "taekwondo_rules_" + rules.version + '.pdf'
    return config({
            fileCache : true,
            addAndroidDownloads : {
              useDownloadManager : true,
              notification : true,
              mime : 'application/pdf',
              path: taekwondoRulesDownloadPath + lastVersionFileName,
            }
          })
    .fetch('GET', rules.pdf_url)
}

const taekwondoRulesDownloadPath = RNFetchBlob.fs.dirs.DownloadDir + '/'

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
