import * as React from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import {ScrollView} from 'react-native-gesture-handler';

export default class FinalAnswers extends React.Component{

    constructor(){
        super();
        this.state={
            allAnswers: [],
            userId: firebase.auth().currentUser.email,
            buttonActive: false
        }
    }

    refAnswers=async()=>{
       db.collection("answers").where("userId", "==", this.state.userId).get()
       .then((snapshot)=>{
           var allAnswersRef = snapshot.docs.map((doc)=>doc.data())
           this.setState({
               allAnswers: allAnswersRef
           })
       })
    }

   compoButtonActive(){
       console.log("Button Pressed");
     this.setState({
         buttonActive: true
     })
     db.collection("answers")
     .onSnapshot((snapshot)=>{
         
     })
   }

    componentDidMount(){
        this.refAnswers();
    }

    render(){
        return(
            <ScrollView style={styles.container}>

                <TouchableOpacity
                 onPress={
                     ()=>{
                         this.props.navigation.navigate("Question")
                     }
                 }
                >
                    <Text style={styles.qsButtonText}>
                        {"<<"} Question Screen
                    </Text>
                </TouchableOpacity>

                {
                    this.state.allAnswers.length == 0
                    ?(
                      <View>
                          <Text style={styles.textStyle}>
                              Attempt the questions on "Question Screen" and find your answers here
                          </Text>
                      </View>
                    )
                    :(
                        <View>
                            <Text style={styles.motiFont}>
                                Are "you" willing to change any of these?  Click the ones you wish to change.
                            </Text>
                          <FlatList
                          data={this.state.allAnswers}
                          keyExtractor={(item, index)=>index.toString()}
                          renderItem={({item})=>(
                          <View style={{borderBottomWidth: 3}}>

                        {/* nested if, to check whether the TouchableOpacity is pressed */}
                           {
                               this.state.buttonActive == true
                               ?(
                                <View>
                                 {/*if the statement is true*/}
                                 <View style={{borderBottomWidth: 2}}>
                                  <TouchableOpacity 
                                  style={[styles.ComponentButton, {backgroundColor: '#AD1116'}]}>
                                    <Text>
                                     {item.answer_1}
                                  </Text>
                             </TouchableOpacity>
                            </View>

                            <View style={{borderBottomWidth: 2}}>
                              <TouchableOpacity 
                               style={[styles.ComponentButton, {backgroundColor: '#AD1116'}]}
                               >
                                <Text>
                                  {item.answer_2}
                                </Text>
                               </TouchableOpacity>
                             </View>

                            <View style={{borderBottomWidth: 2}}>
                               <TouchableOpacity
                                style={[styles.ComponentButton, {backgroundColor: '#AD1116'}]}>
                                <Text>
                                    {item.answer_3}
                                 </Text>
                               </TouchableOpacity>
                            </View>

                            <View style={{borderBottomWidth: 2}}>
                               <TouchableOpacity 
                               style={[styles.ComponentButton, {backgroundColor: '#AD1116'}]}>
                                 <Text>
                                    {item.answer_4}
                                 </Text>
                               </TouchableOpacity>
                            </View>
                                 </View>
                               )

                               :(
                                  <View>
                                {/*if the statement is false*/}
                                      <View style={{borderBottomWidth: 2}}>
                             <TouchableOpacity 
                             style={[styles.ComponentButton, {backgroundColor: '#00AD2E'}]}
                             onPress={
                                ()=>{
                                    this.compoButtonActive()
                                }
                            }
                             >
                               <Text>
                                 {item.answer_1}
                               </Text>
                             </TouchableOpacity>
                            </View>

                            <View style={{borderBottomWidth: 2}}>
                              <TouchableOpacity 
                              style={[styles.ComponentButton, {backgroundColor: '#00AD2E'}]}
                              onPress={
                                ()=>{
                                    this.compoButtonActive()
                                }
                            }
                              >
                                <Text>
                                  {item.answer_2}
                                </Text>
                               </TouchableOpacity>
                             </View>

                            <View style={{borderBottomWidth: 2}}>
                               <TouchableOpacity 
                               style={[styles.ComponentButton, {backgroundColor: '#00AD2E'}]}
                               onPress={
                                ()=>{
                                    this.compoButtonActive()
                                }
                            }
                               >
                                <Text>
                                    {item.answer_3}
                                 </Text>
                               </TouchableOpacity>
                            </View>

                            <View style={{borderBottomWidth: 2}}>
                               <TouchableOpacity 
                               style={[styles.ComponentButton, {backgroundColor: '#00AD2E'}]}
                               onPress={
                                ()=>{
                                    this.compoButtonActive()
                                }
                            }
                               >
                                 <Text>
                                    {item.answer_4}
                                 </Text>
                               </TouchableOpacity>
                            </View>

                                  </View>
                               )
                           }

                     </View>
                 )}
                />
                </View>
              )
            }
    
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    ComponentButton: {
        width: 150,
        height: 40,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
    },
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9"
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
        width: 100,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    qsButtonText: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#07B0F2",
      marginTop: 10,
      marginBottom: 10
    },
    motiFont: {
        color: "#48038C",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        width: 250
    }
})