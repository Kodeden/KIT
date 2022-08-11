import { Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { format, compareAsc } from 'date-fns'

export default function Profile({ route }) {
    const navigation = useNavigation();
    const list = useSelector((state) => state.friendList);
    const dispatch = useDispatch();
    const id = route.params?.id || 0;
    const currentEntry = list.find(entry => entry.id === id);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.profileText}>{currentEntry.firstName}'s Profile</Text>
                <Text style={styles.profileText}>First Name: {currentEntry.firstName}</Text>
                <Text style={styles.profileText}>Last Name: {currentEntry.lastName}</Text>
                <Text style={styles.profileText}>Phone Number: {currentEntry.phoneNumber}</Text>
                <Text style={styles.profileText}>Last Contact Date: {currentEntry.date}</Text>
                <TouchableOpacity style={styles.stamp} onPress={() => dispatch(dateStamp({date: format(new Date(), 'MM/dd/yyyy'), id: currentEntry.id}))}><Text style={{color:'white'}}>Quick</Text><Text style={{color:'white'}}>Stamp</Text></TouchableOpacity>
                <TouchableOpacity style={styles.stamp} onPress={() => console.log(list)}><Text style={{color:'white'}}>Test</Text></TouchableOpacity>
                <TouchableOpacity style={styles.stamp} onPress={() => {
                    dispatch(remove(currentEntry.id));
                    navigation.navigate("Home")
                }}><Text style={{color:'white'}}>Remove Friend</Text></TouchableOpacity>
                <TouchableOpacity style={styles.stamp} onPress={() => {navigation.navigate("AddFriend")}}><Text style={{color:'white'}}>Add Friend</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    profileText: {
        margin: 10,
    },

    stamp: {
        margin:5,
        height:40,
        width:80,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
    }
  });
  