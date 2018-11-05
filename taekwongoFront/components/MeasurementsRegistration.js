import React, {Component} from 'react';

import {
    StyleSheet
} from 'react-native';

import {Button, Container, Content, Footer, Text, Title} from 'native-base'
import {checkStatus} from "./Commons";

import Toast from '@remobile/react-native-toast'
import BluetoothSerial from 'react-native-bluetooth-serial'
//Si no compila borrar @Override en metodo createJSModules()
//en taekwongoFront/node_modules/react-native-bluetooth-serial/android/src/main/java/com/rusel/RCTBluetoothSerial/RCTBluetoothSerialPackage.java

import { Buffer } from 'buffer';
global.Buffer = Buffer;
const iconv = require('iconv-lite');

import MeasurementsConfirmation from "./MeasurementsConfirmation";

export default class MeasurementsRegistration extends Component {
    static navigationOptions = {
        title: 'Entrenando'
    };

    constructor(props) {
        super(props);

        this.training = this.props.navigation.getParam('selectedTraining','NO-TRAINING');
        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            isEnabled: false,
            discovering: false,
            devices: [],
            unpairedDevices: [],
            connected: false,
            section: 0,

            dataReceivedBuffer: [],
            trainingNow: false
        };

        this.buttonForConnecting = this.buttonForConnecting.bind(this);
        this.connectToTaekwonGoBand = this.connectToTaekwonGoBand.bind(this);
        this.taekwonGoBandDevice = this.taekwonGoBandDevice.bind(this);
        this.trainingButtonPressed = this.trainingButtonPressed.bind(this);
    }

    componentWillMount() {
        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list()
        ])
            .then((values) => {
                const [isEnabled, devices] = values;
                this.setState({isEnabled, devices})
            });

        BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'));
        BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'));
        BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
        BluetoothSerial.on('connectionLost', () => {
            if (this.state.device) {
                Toast.showShortBottom(`Connection to device ${this.state.device.name} has been lost`)
            }
            this.setState({connected: false})
        })
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.textForConnectingOrPairing()}
                    {this.buttonForConnecting()}
                    {this.state.connected
                        ? (
                            <Button
                                primary
                                block
                                style={styles.mbt30}
                                onPress={() => this.trainingButtonPressed()}>
                                <Text style={styles.textButton}>{this.trainingButtonText()}</Text>
                            </Button>
                        ) : null}
                </Content>

            </Container>
        );
    }

    textForConnectingOrPairing() {
        if (this.state.connected) {
            return <Text> Ya podes comenzar a entrenar!</Text>
        }
        else {
            if (this.pairedToTaekwonGoBand())
                return <Text> Conectate a la TaekwonGo Band</Text>;
            else
                return <Container>
                <Text style={styles.title}> 
                    Asegurate de haber emparejado con la TaekwonGo Band desde las opciones de
                    Bluetooth:
                </Text>
                <Text>
                    1) Ingresá al menú de Bluetooth de tu dispositivo
                </Text>
                <Text>
                    2) Encendé el Bluetooth
                </Text>
                <Text>
                    3) Buscá los dispositivos más cercanos
                </Text>
                <Text>
                    4) Debería aparecer "TaekwonGo Band", hacé click para emparejar
                </Text>
                <Text>
                    5) Listo, reiniciá la aplicación para entrenar con TaekwonGo Band
                </Text>
                </Container>;
        }
    }

    buttonForConnecting() {
        if (!this.state.connected && this.pairedToTaekwonGoBand())
            return <Button
                primary
                block
                style={styles.mbt30}
                onPress={() => this.connectToTaekwonGoBand()}>
                <Text style={styles.textButton}>Conectar</Text>
            </Button>;
        else
            return null;
    }

    pairedToTaekwonGoBand() {
        return this.state.devices.some(device => this.isTaekwonGoBand(device))
    }

    isTaekwonGoBand(device) {
        return device.name === "TaekwonGo Band";
    }

    connectToTaekwonGoBand() {
        this.connect(this.taekwonGoBandDevice())
    }

    taekwonGoBandDevice() {
        return this.state.devices.find(device => this.isTaekwonGoBand(device))
    }

    trainingButtonText() {
        return this.state.trainingNow ? "FINALIZAR" : 'ENTRENAR';
    }

    trainingButtonPressed() {
        if(this.state.trainingNow){
            this.setState(
                {trainingNow: false},
                () => {this.finishMeasurementRegistration()}
            );

        }
        else
        {

            this.setState(
                {trainingNow: true, dataReceivedBuffer: []},
                () => {
                    this.writePackets(this.trainingTypeCode());
                    this.startMeasurementRegistration();
                }
            );
        }
    }

    finishMeasurementRegistration() {
        clearInterval(this.interval);

        const measurementMagnitudes = this.state.dataReceivedBuffer.join("").split(";").filter( magnitude => magnitude.length > 0);
        this.moveToMeasurementsConfirmation(measurementMagnitudes);
    }

    startMeasurementRegistration() {
        this.interval = setInterval(() => {
            BluetoothSerial.readFromDevice().then((data) => {this.registerMeasurement(data);});
        }, 10);
    }

    registerMeasurement(data) {
        if(data && data.length >0){
            this.state.dataReceivedBuffer.push(data);
            Toast.showLongBottom('Recibido: ' + data)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    trainingTypeCode() {
        return this.training.training_type === "F" ? "1" : "0";
    }

    /**
     * Connect to bluetooth device by id
     * @param  {Object} device
     */
    connect(device) {
        this.setState({connecting: true});
        BluetoothSerial.connect(device.id)
            .then((res) => {
                Toast.showShortBottom(`Connected to device ${device.name}`);
                this.setState({device, connected: true, connecting: false});
            })
            .catch((err) => Toast.showShortBottom(err.message))
    }

    writePackets(message, packetSize = 64) {
        const toWrite = iconv.encode(message, 'cp852');
        const writePromises = [];
        const packetCount = Math.ceil(toWrite.length / packetSize);

        for (var i = 0; i < packetCount; i++) {
            const packet = new Buffer(packetSize);
            packet.fill(' ');
            toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize);
            writePromises.push(BluetoothSerial.write(packet))
        }

        Promise.all(writePromises)
            .then((result) => {
            })
    }


    moveToMeasurementsConfirmation(measurementMagnitudes) {
        this.props.navigation.navigate('MeasurementsConfirmation',
            {
                session_token: this.session_token,
                selectedTraining: this.training,
                magnitudes: measurementMagnitudes
            }
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#FFFFFF'
    },
    textButton: {
        color: 'white',
        fontSize: 20
    },
    mbt30: {
        marginBottom: 10,
        marginTop: 10
    },
    title:{
        textAlign: 'justify',
        color: 'black',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    }
});
