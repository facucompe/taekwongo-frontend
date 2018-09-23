import React, { Component } from "react";
import {
    Button,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Picker,
    Text,
} from "native-base";
import {StyleSheet} from "react-native";
export default class CreateTraining extends Component {
    static navigationOptions = {
        title: 'Crear Entrenamiento'
    };
    constructor(props) {
        super(props);
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.creationInfo()),
            })
                .then(response => response.json())
                .then(response => this.checkStatus(response))
                .then(response => {
                    alert('Entrenamiento guardado OK.')
                })
                .catch(err => {
                    alert('Ha habido un error. Pruebe más tarde');
                    console.log('Error en el el fetch: ' + error.message);
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

    allFieldsCompleted(){
        return this.state.title !== undefined && this.state.trainingType !== undefined
    }
    postOkFieldValidations(){
        return this.titleValidation()
    }
}
function isValidTitle(aString) {
    return notEmptyAndFitsRegex(aString,/^[A-Za-z0-9\s]+$/);
}
function notEmptyAndFitsRegex(aString,aRegex){
    return aString !== "" && aRegex.test(aString);
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