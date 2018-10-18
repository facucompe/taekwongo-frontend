import React, { Component } from 'react';

import {StyleSheet, Image} from 'react-native';

import { Col, Grid, Row, Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Picker } from 'native-base';
import moment from "moment";
import {checkStatus} from "./Commons";

export default class Calendar extends Component {

    static navigationOptions = {
        title: 'Calendario',
        drawerLabel: 'Calendario',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./img/calendario.png')}
                style={styles.icon}
            />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            allCompetitions: [],
            month: "-1",
            category: "-1"
        };

    }
    onValueChangeMonth(aMonthValue){
        this.setState({month: aMonthValue});
    }

    onValueChangeCategory(aCategoryValue){
        this.setState({category: aCategoryValue});
    }

    componentDidMount() {
		fetch('http://taekwongo.herokuapp.com/competitions', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
		}})
			.then(response => response.json())
            .then(response => checkStatus(response))
			.then(response => {
				this.setState({allCompetitions: response});        
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el fetch: ' + error.message);
			});
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Col style={{width:'20%'}}>
                        <Text style={styles.text}>Filtros:</Text>
                    </Col>
                    <Col>
                        <Text style={styles.text}>  Mes</Text>
                        {this.renderMonthFilters()}
                    </Col>
                    <Col>
                        <Text style={styles.text}>  Categoría</Text>
                        {this.renderCategoryFilters()}
                    </Col>
                </Header>
                <Content>
                    <List>
                        {
                            this.state.allCompetitions.filter(c => this.shouldRender(c)).map(this.renderCompetition)
                        }
                    </List>
                </Content>
            </Container>
        );
    }

    renderCompetition = (item) => {
        const start_date = this.formatDate(item.start_date);
        return (
            <ListItem avatar key={item.id}>
                <Left>
                    <Text> {start_date} </Text>
                </Left>
                <Body>
                <Text>{item.name}</Text>
                <Text note>{item.city}</Text>
                </Body>
                <Right>
                    <Text>{item.category}</Text>
                </Right>
            </ListItem>
        )
    };

    renderMonthFilters() {
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.month}
                onValueChange={(itemValue, itemIndex) => this.onValueChangeMonth(itemValue)}
                style={styles.text}
            >
                <Picker.Item label="Todos" value="-1" />
                <Picker.Item label="Enero" value="0" />
                <Picker.Item label="Febrero" value="1" />
                <Picker.Item label="Marzo" value="2" />
                <Picker.Item label="Abril" value="3" />
                <Picker.Item label="Mayo" value="4" />
                <Picker.Item label="Junio" value="5" />
                <Picker.Item label="Julio" value="6" />
                <Picker.Item label="Agosto" value="7" />
                <Picker.Item label="Septiembre" value="8" />
                <Picker.Item label="Octubre" value="9" />
                <Picker.Item label="Noviembre" value="10" />
                <Picker.Item label="Diciembre" value="11" />
            </Picker>
        );
    }

    renderCategoryFilters() {
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.category}
                onValueChange={(itemValue, itemIndex) => this.onValueChangeCategory(itemValue)}
                style={styles.text}
            >
                <Picker.Item label="Todas" value="-1" />
                <Picker.Item label="G1/G2" value="G1G2" />
                <Picker.Item label="GP" value="GP" />
                <Picker.Item label="JJOO" value="JJOO" />
                <Picker.Item label="TMA" value="TMA" />
            </Picker>
        );
    }

    formatDate (start_date) {
        return moment(start_date).format("DD/MM/YYYY");
    }

    shouldRender(competition){
        return this.categoryApplies(competition) && this.monthApplies(competition);
    }

    categoryApplies(competition){
        return this.state.category == "-1" || this.state.category == competition.category
    }

    monthApplies(competition){
        return this.state.month == "-1" || this.state.month == moment(competition.start_date).month();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    header:{
        backgroundColor: 'white',
    },
    text: {
        color: 'black'
    },
    icon: {
        width: 24,
        height: 24,
    }
});
