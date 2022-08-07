import { Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import friendsList from "../assets/FriendsList.js";

export default function Profile({ route }) {
    const navigation = useNavigation();
    const list = friendsList();
    const id = route.params?.id || 0;
    const currentEntry = list.find(entry => entry.id === id);
    const fullDate = currentEntry.month+"/"+currentEntry.date+"/"+currentEntry.year;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.profileText}>{currentEntry.firstName}'s Profile</Text>
                <Text style={styles.profileText}>First Name: {currentEntry.firstName}</Text>
                <Text style={styles.profileText}>Last Name: {currentEntry.lastName}</Text>
                <Text style={styles.profileText}>Phone Number: {currentEntry.phoneNumber}</Text>
                <Text style={styles.profileText}>Last Contact Date: {(currentEntry.date === 0) ? "Unknown" :  fullDate}</Text>
                <TouchableOpacity style={styles.stamp} onPress={() => console.log(currentEntry)}><Text>Quick</Text><Text>Stamp</Text></TouchableOpacity>
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
        width: 70,
        height: 70,
        margin: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AA66AA',
        borderRadius: 35,
        borderWidth: 2,
    }
  });
  