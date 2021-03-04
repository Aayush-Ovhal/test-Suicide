import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

var msgs =[];
export default class CommunityScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            theMessage: "",
            allMessages: []
        }
    }

    updateMsg=()=>{
        db.collection("messages").add({
           userId: this.state.userId,
           message: this.state.theMessage,
           timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    // refMsgs=async()=>{
    //     db.collection("messages")
    //     .onSnapshot((snapshot)=>{
    //         var allMessages = snapshot.docs.map((doc)=>doc.data())
    //         this.setState({
    //             allMessages: allMessages
    //         })
    //     })
    // }
    
    refMsgs=async()=>{
        var msgRef = db.collection("messages");
        var msgList;
        msgRef.onSnapshot((snapshot)=>{
          snapshot.docs.map((doc)=>{
              msgList = doc.data();
              msgs.push(msgList)
            this.setState({
                allMessages: msgs
            })
          })
          console.log(msgs.length)
        })
    
        msgs.sort(function(msg1, msg2){
            return msg1.timeStamp - msg2.timeStamp
        })
        
        console.log(msgs.length.toString())
        console.log(this.state.allMessages)
    }

    componentDidMount(){
        this.refMsgs();
        console.log(this.state.userId);
    }

    keyExtractor = (item, index)=>index.toString();

    renderItem=({item})=>{
        return(
            <View>
                <Text>
                    {item.message}
                </Text>
            </View>
        )
    }

    render(){
        return(
         <SafeAreaProvider>
            <View style={styles.container}>

                {/* //the Header */}
               <Header
                centerComponent={{text: "Community Chat", style:{fontSize: 25, fontFamily: "Bahnschrift", color: "#68D693"}}}
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

               <View>
                
               <View style={{borderBottomWidth: 2}}>
                   <FlatList
                   data={this.state.allMessages}
                   renderItem={this.renderItem}
                   keyExtractor={this.keyExtractor}
                   />
               </View>
                
               
               </View>

               {/* // text input to type the message */}
               <View>
               <TextInput
                placeholder="Express your feelings(We will keep you anonymous)"
                style={styles.textInputStyle}
                multiline={true}
                onChangeText={ (text)=>{ this.setState({ theMessage: text })}}
               />
               </View>

            {/* // the send button */}
            <View>
               <TouchableOpacity
                onPress={this.updateMsg}
                style={styles.sendButton}
               >
                   <Image
                    source={require("../assets/paper-plane (1).png")}
                    style={{width: 45, height: 45}}
                   />
                   <Text style={{fontFamily: "Bahnschrift", fontSize: 17, opacity: 0.65}}>
                       Send
                   </Text>
               </TouchableOpacity>
               </View>

            </View>
            </SafeAreaProvider>
        )
    }
} 

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D9D9D9"
    },
    textInputStyle: {
        marginTop: 550,
        width: 600,
        height: 60,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        fontFamily: "Bahnschrift",
        marginLeft: 450,
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 4
        },
        shadowRadius: 10.32,
        shadowOpacity: 0.30,
        elevation: 16
    },
    userMsg: {
        color: "#000"
    },
    nonUserMsg: {
        color: "#92D428"
    },
    sendButton: {
        marginLeft: 1050,
        marginTop: -60,
       // backgroundColor: '#000',
        width: 100,
        height: 50,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    },
    fontStyle: {
        fontFamily: "Bahnschrift",
        fontSize: 30,
        fontWeight: "bold",
        color: "#025920",
        marginTop: -300,
        marginLeft: 670,
        opacity: 0.50
    }
})