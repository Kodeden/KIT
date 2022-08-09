import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";


export default function AddFriend() {
    const navigation = useNavigation();

    


    return (
        <SafeAreaView>
            <View style={styles.AddFrdPge}>
                <View style={styles.inputFields}>
                    <Text>First Name:</Text><TextInput 
                    placeholder="First Name">
                    </TextInput>
                </View>
                <View style={styles.inputFields}>
                    <Text>Last Name:</Text><TextInput 
                    placeholder="Last Name">
                    </TextInput>
                </View>
                <View style={styles.inputFields}>
                    <Text>Phone Number:</Text><TextInput 
                    keyboardType="number-pad"
                    placeholder="(000)-000-0000">
                    </TextInput>
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
    inputFields:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
})