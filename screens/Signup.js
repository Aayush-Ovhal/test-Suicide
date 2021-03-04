import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';


export default class Signup extends React.Component{

    constructor(){
     super();
     this.state={
         name: "",
         gmail: "",
         pwd: ""
     }   
    }

    userSignup=(gmail, pwd)=>{
        firebase.auth().createUserWithEmailAndPassword(gmail, pwd)
        .then(()=>{
            db.collection("users").add({
                name: this.state.name,
               emailId: this.state.gmail
            })
        })
        this.props.navigation.navigate("Question")
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaProvider>

                    <Header
                     centerComponent={{text: "Welcome!!", style:{fontWeight: 'bold', fontSize: 30, color: "#68D693"}}}
                    />

               <Image
                  source={require("../assets/sick_logo.png")}
                  style={styles.imageStyle}
                />

                <TextInput
                style={[styles.textInput, {marginTop: 20}]}
                 placeholder="Think of a nickname for yourself!"
                 onChangeText={
                     (text)=>{
                         this.setState({
                          name: text
                         })
                     }}/>

                <TextInput
                style={[styles.textInput, {marginTop: 20}]}
                 placeholder="Enter your Gmail Id"
                 onChangeText={
                     (text)=>{
                      this.setState({
                          gmail: text
                      })
                   }}/>

                   <TextInput
                    style={[styles.textInput, {marginTop: 20}]}
                    placeholder = "Password(Max 10 characters)"
                    secureTextEntry={true}
                    maxLength={10}
                    onChangeText={
                        (text)=>{
                          this.setState({
                              pwd: text
                          })
                        }
                    }
                   />

                <TouchableOpacity
                 style={styles.buttonStyle}
                 onPress={()=>{this.userSignup(this.state.gmail, this.state.pwd)}}>
                    <Text style={styles.textStyle}>
                        Add User
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={()=>{this.props.navigation.navigate("LogIn")}}
                     >
                    <Text style={styles.logIn}>
                       Already have an account? Log In
                    </Text>
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
        marginLeft: 85,
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
        fontWeight: "bold",
        fontSize: 20,
        color: "#0267B3"
    },
    logIn: {
     marginTop: 15,
     marginLeft: 60,
     alignItems: "center",
     justifyContent: "center",
     color: "#0267B3",
     fontWeight: "bold",
     fontSize: 17
    },
    imageStyle: {
        width: 200,
        height: 200,
        marginLeft: 60,
        alignSelf: "center"
    }
})