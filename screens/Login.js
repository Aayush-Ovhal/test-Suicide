import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import {useFonts} from 'expo-font';

export default class Login extends React.Component{

    constructor(){
        super();
        this.state={
            emailId: "",
            password: ""
        }
    }

    userSignIn=(emailId, pwd)=>{
      firebase.auth().signInWithEmailAndPassword(emailId, pwd)
      .then(()=>{
          this.props.navigation.navigate("Question");
      })
      .catch((error)=>{
          var errorMessage = error.message;
          return alert(errorMessage)
      })
    }

    render(){
        return(
            <View style={styles.container}>
             <SafeAreaProvider>

              <Header
               centerComponent={{text:"Welcome!!", style:{fontWeight: "bold", fontSize: 30, color: "#68D693"}}}
              />

             <TouchableOpacity
               onPress={()=>{this.props.navigation.navigate("WelcomeScreen")}}
              >
                  <Text style={styles.signUp}>{"<<"}Sign Up</Text>
              </TouchableOpacity>

                <TextInput
                 placeholder="Your emailId here!"
                 style={[styles.textInput, {marginTop: 20}]}
                 keyboardType="email-address"
                 onChangeText={
                     (text)=>{this.setState({emailId: text})}
                 }
                />

                <TextInput
                 placeholder="Remember your password?"
                 style={[styles.textInput, {marginTop: 20}]}
                 secureTextEntry={true}
                 onChangeText={
                     (text)=>{this.setState({password: text})}
                 }
                />

                <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={
                    ()=>{this.userSignIn(this.state.emailId, this.state.password)}}
                >
                    <Text style={styles.textStyle}>Log In</Text>
                </TouchableOpacity>

                
             </SafeAreaProvider>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9"
    },
    textInput: {
        borderWidth: 2,
        width: 300,
        height: 40,
        marginLeft: 40,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 20,
        borderRadius: 5,
        fontFamily: "Bahnscrift"
    },
    buttonStyle: {
        backgroundColor: "#ff9800",
        width: 200,
        height: 50,
        borderRadius: 40,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        marginLeft: 100,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 2
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    },
    textStyle:{
        fontFamily: "Bahnschrift",
        fontWeight: "bold",
        fontSize: 25,
        color: "#0267B3"
    },
    signUp: {
       marginTop: 10,
        marginLeft: 10,
        width: 120,
        height: 40,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 5,
        color: "#0267B3",
        fontWeight: "bold",
        fontSize: 20
       }
})