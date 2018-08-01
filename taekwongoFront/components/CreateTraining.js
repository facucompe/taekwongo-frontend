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
        return !this.state.validatingTitle || isValidName(this.state.title);
    }

    renderTitleError() {
        return this.titleValidation() ? null :  <Icon name='close-circle' />;
    }


    onCreation() {

        if (this.allFieldsCompleted() && this.postOkFieldValidations()) {
            alert("Datos OK. Title: " + this.state.title + " Tipo de Entrenamiento: " + this.state.trainingType);
            //To Do: Sacar el alert y hacer el POST al backend para registrar el entrenamiento
        }
        else {
            alert("Corregir campos inválidos");
        }

    }

    allFieldsCompleted(){
        return this.state.title !== undefined && this.state.trainingType !== undefined
    }

    postOkFieldValidations(){
        return this.titleValidation()
    }

}

function isValidName(aString) {
    return notEmptyAndFitsRegex(aString,/^[A-Za-z\s\u0027\u2019]+$/);
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
    }
});