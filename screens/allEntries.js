import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class AllEntries extends React.Component{

    constructor(){
        super();
        this.state={
            allEntries: [],
            userId: firebase.auth().currentUser.email
        }
    }

    refEntries=async()=>{
        db.collection("diary").where("userId", "==", this.state.userId).get()
        .then((snapshot)=>{
            var allEntries = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                allEntries: allEntries
            })
        })
    }

    componentDidMount(){
        this.refEntries();
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaProvider>
                  <Header
                   centerComponent={{text: "All Entries", style: {fontWeight: "bold", fontSize: 30, color: "#68D693"}}}
                  />

                  {
                      this.state.allEntries.length == 0
                      ?(
                         <View>
                            <Text style={styles.noItemText}>
                                No entries yet
                            </Text>
                         </View>
                      )
                      :(
                        <View>
                           <FlatList
                            data = {this.state.allEntries}
                            keyExtractor={(item, index)=>index.toString()}
                            renderItem={({item})=>(
                                <View style={{borderBottomWidth: 2}}>
                                    <Text style={styles.title}>
                                        {item.highlight}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        {item.entry}
                                    </Text>
                                    <TouchableOpacity 
                                     style={styles.viewButton}
                                     onPress={
                                         ()=>{
                                             this.props.navigation.navigate("EntireEntry", {
                                                 "Details": item
                                             })
                                            // console.log("Button Pressed")
                                         }
                                     }
                                     >
                                        <Text style={styles.viewText}>
                                            View
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                           />
                        </View>
                      )
                  }
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
    noItemText: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#8C8C8C",
        justifyContent: "center",
        textAlign: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 10
    },
    subtitle: {
        fontWeight: "400",
        fontSize: 20,
        marginLeft: 10
    },
    viewButton: {
        borderWidth: 2,
        borderRadius: 3,
        marginLeft: 150,
        marginTop: -45,
        width: 100,
        height: 40,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#66E3D7",
        marginBottom: 10
    },
    viewText: {
      fontWeight: "500",
      fontSize: 20,
      color: "#1E37E6"
    }
})