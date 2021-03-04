import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from '../config';
import firebase from 'firebase';
import questionDb from '../localdb';
import { ScrollView } from 'react-native-gesture-handler';

export default class Questions extends React.Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            ans1: "",
            ans2: "",
            ans3: "",
            ans4: "",
            questionNo: 1,
            finalAns: ""
        }
    }

    updateAns=()=>{
      db.collection("answers").add({
          "userId": this.state.userId,
          "answer_1": this.state.ans1,
          "answer_2": this.state.ans2,
          "answer_3": this.state.ans3,
          "answer_4": this.state.ans4,
          "timeStamp": firebase.firestore.FieldValue.serverTimestamp()
      })

      this.props.navigation.navigate("Answers");
    }

    render(){
        return(
          
            <SafeAreaProvider>
            <View style={styles.container}>
 
              <Header
               centerComponent={{text: "Questions", style:{fontSize: 30, fontWeight: "bold", color: "#68D693"}}}
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

              <ScrollView>

              <TextInput
                placeholder={questionDb["question1"].text}
                style={styles.textInputStyle}
                multiline={true}
                onChangeText={
                    (text)=>{
                        this.setState({
                          ans1: text
                        })
                    }
                }
                value = {this.state.ans1}
              />

              <TextInput
                placeholder={questionDb["question2"].text}
                style={styles.textInputStyle}
                multiline={true}
                onChangeText={
                    (text)=>{
                        this.setState({
                          ans2: text
                        })
                    }
                }
                value = {this.state.ans2}
               />    

            <TextInput
                placeholder={questionDb["question3"].text}
                style={styles.textInputStyle}
                multiline={true}
                onChangeText={
                    (text)=>{
                        this.setState({
                          ans3: text
                        })
                    }
                }
                value = {this.state.ans3}
              />

               <TextInput
                placeholder={questionDb["question4"].text}
                style={styles.textInputStyle}
                multiline={true}
                onChangeText={
                    (text)=>{
                        this.setState({
                          ans4: text
                        })
                    }
                }
                value = {this.state.ans4}
              />

               <TouchableOpacity
                onPress={
                    ()=>{this.updateAns()}
                }
                style={styles.buttonStyle}
               >
                   <Text style={{fontFamily: "Bahnschrift", fontSize: 20, fontWeight: "bold"}}>Submit</Text>
               </TouchableOpacity>

              </ScrollView>
                          
            </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9"
    },
    textStyle: {
        fontSize: 30,
        fontFamily: "Bahnschrift"
    },
    buttonStyle: {
     width: 200,
     height: 50,
     marginTop: 25,
     marginLeft: 90,
     alignItems: "center",
     textAlign: "center",
     justifyContent: "center",
     borderRadius: 30,
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     backgroundColor: "#F25C05",
     marginBottom: 5
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Bahnschrift"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 2,
        marginLeft: 700
    },
    textInputStyle:{
        width: 300,
        height: 200,
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: "Bahnschrift",
        marginLeft: 40,
        marginTop: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 4
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32
    },
    fbButton: {
      backgroundColor: "#27B7F5",
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      shadowColor: "#000",
      shadowOffset: {
          width: 8,
          height: 4
      },
      elevation: 16,
      shadowRadius: 10.32,
      shadowOpacity: 0.30
    }
})