import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    View,
    FlatList
} from 'react-native';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

export default class Calendar extends Component {

    static navigationOptions = {
        title: 'Calendario'
    }

    constructor(props) {
        super(props);
        this.state = {
            competitions: []
        };
    }

    componentDidMount() {
		fetch('http://taekwongo.herokuapp.com/competitions', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
		}})
			.then(response => response.json())
			.then(response => {
				this.setState({competitions: response});
			})
			.catch(error => {
				alert('Error de conexión, intente nuevamente');
				console.log('Error en el fetch: ' + error.message);
			});
    }
    
    renderCompetition = (item) => {
      var start_date = this.parseDate(item.start_date);
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
    }

    render() {
        return (
          <Container style={styles.container}>
            <Content>
              <List>
            {
              this.state.competitions.map(this.renderCompetition)
            }
            </List>
            </Content>
	        </Container>
        );
    }

    parseDate (start_date) {
      var date = new Date(start_date);
      return (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
