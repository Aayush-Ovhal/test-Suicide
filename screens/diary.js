import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class Diary extends React.Component{

    constructor(){
        super();
        this.state={
            entry: "",
            highlight: "",
            userId: firebase.auth().currentUser.email
        }
    }

    updateTexts=()=>{
        db.collection("diary").add({
         "userId": this.state.userId,
         "entry": this.state.entry,
         "highlight": this.state.highlight
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaProvider>
                    <Header 
                     centerComponent={{text: "Your Diary", style: {fontWeight: "bold", fontSize: 30, color: "#68D693"}}}
                     leftComponent={
                         <Icon
                          name="bars"
                          type="font-awesome"
                          color="#FFFFFF"
                          onPress={
                              ()=>{
                                  this.props.navigation.toggleDrawer()
                              }
                          }
                         />
                     }
                    />

                    <TextInput
                     placeholder={"C'mon speak up. You can trust this machine!"}
                     style={[styles.textInput, {height: 400, fontWeight: "400"}]}
                     multiline={true}
                     onChangeText={(text)=>{this.setState({entry: text})}}
                    />

                    <TextInput
                     placeholder={"Highlight of the day"}
                     style={[styles.textInput, {height: 60, fontWeight:"600"}]}
                     multiline={true}
                     onChangeText={(text)=>{this.setState({highlight: text})}}
                    />

                   <TouchableOpacity
                    onPress={()=>{this.updateTexts()}}
                    style={styles.button}
                   >
                       <Image
                        source={require("../assets/submit (1).png")}
                        style={styles.image}
                       />
                   </TouchableOpacity>

                </SafeAreaProvider>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9"
    },
    textInput: {
        marginLeft: 20,
        marginTop: 30,
        fontSize: 20,
        width: 300,
        borderWidth: 1.5,
        borderRadius: 2
    },
    image: {
        width: 100, 
        height: 100,
        marginTop: 10
    },
    button: {
        width: 100, 
        height: 100,
        marginTop: 10,
        marginLeft: 100
    }
})