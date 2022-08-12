import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image, ScrollView } from "react-native";
import React ,{useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { useSelector, useDispatch } from "react-redux";
import { format, compareAsc, compareDesc } from 'date-fns'
import {Cell, Section, TableView} from "react-native-tableview-simple";



export default function TestTableView() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friendList);
   
    


    return (
        <ScrollView contentContainerStyle={styles.mainPage}>
                <TableView>
                    <Section hideSeparator="true">
                        {friends.map((friends) => (
                        friends.id !== 0 ? (   
                            <Cell  key={friends.id} cellStyle="Basic">
                               <Text>{friends.firstName} {friends.lastName} {friends.date}</Text>                          
                            </Cell> 
                        ) : null
                        ))}     
                    </Section>
                </TableView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainPage:{
        width:400,
    },

    contactedBtn:{
        height:30,
        width:30,
    },

    friendsList:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        paddingLeft: 4,
    },
})


