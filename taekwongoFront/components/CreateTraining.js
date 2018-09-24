import React, {Component} from "react";
import {Button, Container, Content, Form, Icon, Input, Item, Label, Picker, Text,} from "native-base";
import {StyleSheet} from "react-native";
import {checkStatus, isValidTitle} from "./Commons";

export default class CreateTraining extends Component {
    static navigationOptions = {
        title: 'Crear Entrenamiento'
    };
    constructor(props) {
        super(props);

        this.session_token = this.props.navigation.getParam('session_token','NO-TOKEN');

        this.state = {
            trainingType: 'F',
            title: undefined,
            validatingTitle: false
        };
        this.onCreation = this.onCreation.bind(this);
        this.titleValidation = this.titleValidation.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.renderTitleError = this.renderTitleError.bind(this);
    }
    setTitle(title){
        this.setState({title, validatingTitle: true })
    }
    onValueChangeTrainingType(trainingType){
        this.setState({trainingType})
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item floatingLabel error={!this.titleValidation()}>
                            <Label>Título</Label>
                            <Input
                                onChangeText={this.setTitle}
                                value={this.state.title}
                                maxLength={30}
                            />
                            {this.renderTitleError()}
                        </Item>
                        <Text>{'\n\t'} Tipo de Entrenamiento </Text>
                        <Picker
                            mode="dropdown"
                            placeholder="Tipo de Entrenamiento"
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="black"
                            selectedValue={this.state.trainingType}
                            onValueChange={this.onValueChangeTrainingType.bind(this)}
                        >
                            <Picker.Item label="Fuerza" value="F" />
                            <Picker.Item label="Velocidad" value="V" />
                        </Picker>
                        <Button
                            primary
                            block
                            style={styles.mbt30}
                            onPress={(this.onCreation)}
                        >
                            <Text style={styles.buttonText}>Crear Entrenamiento</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
    titleValidation() {
        return !this.state.validatingTitle || isValidTitle(this.state.title);
    }
    renderTitleError() {
        return this.titleValidation() ? null :  <Icon name='close-circle' />;
    }
    onCreation() {
        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            fetch('http://taekwongo.herokuapp.com/trainings', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: this.session_token
                },
                body: JSON.stringify(this.creationInfo()),
            })
                .then(response => response.json())
                .then(response => checkStatus(response))
                .then(response => {
                    this.moveToCreatedTrainingView(response);
                    //alert('Entrenamiento guardado OK.');
        })
                .catch(err => {
                    alert('Ha habido un error. Pruebe más tarde');
                    console.log('Error en el el fetch: ' + err.message);
                });

        }
        else {
            alert("Corregir campos inválidos");
        }
    }

    creationInfo() {
        return {
            training: {
                title: this.state.title,
                training_type: this.state.trainingType
            }
        }
    }

    trainingFrom(response){
        return  {
                id: response["id"],
                title: response["title"],
                user_id: response["user_id"],
                training_type: response["training_type"],
                created_at: response["created_at"],
                updated_at: response["updated_at"]
            }
    }

    allFieldsCompleted(){
        return this.state.title !== undefined && this.state.trainingType !== undefined
    }
    postOkFieldValidations(){
        return this.titleValidation()
    }

    moveToCreatedTrainingView(response) {
        this.props.navigation.navigate('Training', {session_token: this.session_token, selectedTraining: this.trainingFrom(response)})
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor: '#F5FCFF'
    },
    text:{
        color:'black'
    },
    image:{
        marginRight:10
    },
    itemText:{
        color:'black'
    },
    item:{
        flex:1,
        flexDirection:'row',
        padding:10,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    titleText:{
        fontWeight:'bold'
    },
    mbt30: {
        marginBottom: 30,
        marginTop: 30
    }
});