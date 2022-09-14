import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add, remove, dateStamp } from "../redux/FriendListSlice";


export default function AddFriend() {
    const navigation = useNavigation();
    const [newFirstName, onChangeNewFirstName] = useState("");
    const [newLastName, onChangeNewLastName] = useState("");
    const [newPhoneNumber, onChangeNewPhoneNumber] = useState("");
    const dispatch = useDispatch();

    const formatPhoneNumber = (phoneNumberString) => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
      }


    return (
        <SafeAreaView>
            <View style={styles.AddFrdPge}>
                <View style={styles.inputContainer}>
                    <View style={styles.inputFields}>
                        <Text style={{color:'#DDD'}}>First Name:</Text><TextInput 
                        testID="firstNameInput"
                        value={newFirstName}
                        onChangeText={onChangeNewFirstName}
                        style={{borderWidth:1, padding:3, width:120, borderColor:'white', color:'#DDD'}} 
                        placeholder="First Name"
                        placeholderTextColor={'#DDD'}>
                        </TextInput>
                    </View>

                    <View style={styles.inputFields}>
                        <Text style={{color:'#DDD'}}>Last Name:</Text><TextInput 
                        value={newLastName}
                        onChangeText={onChangeNewLastName}
                        style={{borderWidth:1, padding:3, width:120, borderColor:'white', color:'#DDD'}} 
                        placeholder="Last Name"
                        placeholderTextColor={'#DDD'}>
                        </TextInput>
                    </View>

                    <View style={styles.inputFields}>
                        <Text style={{color:'#DDD'}}>Phone Number:</Text><TextInput
                        value={newPhoneNumber}
                        onChangeText={onChangeNewPhoneNumber}
                        style={{borderWidth:1, padding:3, width:120, borderColor:'white', color:'#DDD', marginLeft:-24}} 
                        keyboardType="number-pad"
                        placeholder="(999)-999-9999"
                        placeholderTextColor={'#DDD'}>
                        </TextInput>
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                         style={styles.button}
                         onPress={() => {
                            dispatch(add({firstName: newFirstName, lastName: newLastName, phoneNumber: formatPhoneNumber(newPhoneNumber), date: new Date().toISOString()}));
                            navigation.navigate("Home");
                            }}

                    ><Text style={{color:"#DDD"}}>Submit</Text>
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
        backgroundColor:'#001525',
    },

    inputContainer:{
        height:130,
        width:390,
        borderWidth:1,
        margin:1,
        marginTop:4,
        borderColor:'#DDD',
        backgroundColor:'#001525',
        
    },

    inputFields:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:5,
    },

    buttonContainer:{
        marginTop:5,
        height:100,
        width:400,
        alignItems:'center',
    },

    button:{
        height:40,
        width:80,
        backgroundColor:'#001525',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor:"#DDD"
    },
})