import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";


export default function AddFriend() {
    const navigation = useNavigation();

    


    return (
        <SafeAreaView>
            <View style={styles.AddFrdPge}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputFields}>
                        <Text>First Name:</Text><TextInput 
                        style={{borderWidth:1, padding:3, width:120}} 
                        placeholder="First Name">
                        </TextInput>
                    </View>

                    <View style={styles.inputFields}>
                        <Text>Last Name:</Text><TextInput 
                        style={{borderWidth:1, padding:3, width:120}} 
                        placeholder="Last Name">
                        </TextInput>
                    </View>

                    <View style={styles.inputFields}>
                        <Text>Phone Number:</Text><TextInput
                        style={{borderWidth:1, padding:3, width:125, marginLeft:-10}} 
                        keyboardType="number-pad"
                        placeholder="(999)-999-9999">
                        </TextInput>
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                         style={styles.button}
                    ><Text style={{color:'white'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AddFrdPge:{
        height:800,
        width:400,
    },

    inputContainer:{
        height:130,
        width:400,
        borderWidth:2,
        margin:1,
        borderColor:'black',
        
    },

    inputFields:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:5,
    },

    buttonContainer:{
        height:100,
        width:400,
        alignItems:'center',
    },

    button:{
        height:40,
        width:80,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
    },
})