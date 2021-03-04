import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class EntireEntry extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userId: firebase.auth().currentUser.email,
            entryText: this.props.navigation.getParam("Details")['entry'],
            highlight: this.props.navigation.getParam("Details")['highlight']
        }
    }

    render(){
        return(
            <View>
               <Card>
                   <Text style={{fontWeight: "bold"}}>
                       Your "Highlight" of the day: {this.state.highlight}
                   </Text>
               </Card>

               <Card>
                   <Text style={{fontWeight: "bold"}}>
                       Your today's entry: {this.state.entryText}
                   </Text>
               </Card>
            </View>
        )
    }
}