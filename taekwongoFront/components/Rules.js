import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { Button, Container } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from '@remobile/react-native-toast';

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
            <Container style={styles.container}>
            <View style={styles.view}>
                <Button 
                primary               
                block
                style={styles.button}
                onPress={(openRules)}>
                    <Text style={styles.textButton}>Abrir Reglamento</Text>
                </Button>
                <Button 
                primary
                block
                style={styles.button}
                onPress={(downloadRules)}>
                    <Text style={styles.textButton}>Descargar Reglamento</Text>
                </Button>
            </View>
            </Container>
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
        });

        var lastVersionDownloaded = rules.sort(function(file1, file2){
            return file1 < file2;
        })[0];

        if (lastVersionDownloaded !== undefined) {
            openRulesPDF(lastVersionDownloaded);
        } else {
            getLastVersion().then(function(rules){
                downloadRulesPDF(rules).then(function() {
                    var lastVersionFileName = "taekwondo_rules_" + rules.version + '.pdf';
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
    var lastVersionFileName = "taekwondo_rules_" + rules.version + '.pdf';
    Toast.showShortBottom('Descargando...');
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

const taekwondoRulesDownloadPath = RNFetchBlob.fs.dirs.DownloadDir + '/';

const styles = StyleSheet.create({
    textButton:{
        color:'white',
        fontSize: 20,
    },
    button: {
        marginTop: 30
    },
    view: {
        marginLeft: 40,
        marginRight: 40
    },
    icon: {
          width: 24,
          height: 24,
      },
      container: {
        flex: 1,
        backgroundColor:'white'
    },

});
