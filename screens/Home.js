import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image, ScrollView } from "react-native";
import React ,{useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { useSelector, useDispatch } from "react-redux";
import { format, compareAsc, compareDesc } from 'date-fns'




export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friendList);
    /*const dateList = [];
    var compareAsc = require('date-fns/compareAsc');
    const sortedList = [];


    friends.map((friend) => (
        dateList.push(friend.date)
    ));
    const sortedDateList = dateList.sort(compareAsc);
    sortedDateList.map((date) => (
        friends.map((friend) => (
            sortedList.push((friend.date == date) ? friend : {})                
        ))
    ));
    const cleanedList = sortedList.filter((friend) => Object.keys(friend).length !== 0);
*/


    


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.mainPage}>
                    <View style={styles.KIT}>
                        {friends.map((friends) => (
                        friends.id !== 0 ? (
                        <View key={friends.id} style={styles.friendsContainer}>    
                            <Text style={styles.friends}>{friends.firstName} {friends.lastName}</Text> 
                            <Text style={styles.friends}>{friends.date}</Text>

                            <TouchableOpacity
                                onPress={() => {navigation.navigate("Profile", {id: friends.id})}}
                                style={styles.touchableButton}>
                                <Image
                                style={styles.contactedBtn}
                                source={require("../assets/emptyAvatar3.png")}>                           
                                </Image>
                            </TouchableOpacity>  


                            <TouchableOpacity
                                onPress={() => dispatch(dateStamp({date: format(new Date(), 'MM/dd/yyyy'), id: friends.id}))}
                                style={styles.touchableButton}>
                                <Image
                                style={styles.contactedBtn}
                                source={require("../assets/speechbubble.png")}
                                ></Image>
                            </TouchableOpacity>

                        </View>
                        ) : null
                        ))}            
                    </View>

                </View>
            </ScrollView>
            <View style={styles.navBtnCtn}>
                <TouchableOpacity
                title="New Friend"
                style={styles.button}
                onPress={() => {navigation.navigate("AddFriend")}}
                ><Text style={{color:'black', fontFamily:'notoserif'}}>Add Friend</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainPage:{
        flex:5,
        flexDirection:'row',
        backgroundColor:'#88BBD6',
    },

    KIT:{
        height:650,
        width:390,
        borderWidth:1,
        marginRight: 15,
        marginLeft:1,
    },

    contactedBtn:{
        height:30,
        width:30,
    },

    friends:{
        flex: 4,
        fontFamily:'notoserif' ,
        fontSize:18, 
        color:'black'    
    },

    touchableButton:{
        flex: 1,
    },

    friendsContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop:4,
        paddingLeft: 4,
    },

    navBtnCtn:{
        height:75,
        width:400,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#CDCDCD',
    },

    button:{
        height:40,
        width:80,
        backgroundColor:'#99D3DF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
        paddingTop:2,
    },

})




/*                <TouchableOpacity
                title="Test TableView"
                style={styles.button}
                onPress={() => {navigation.navigate("TestTableView")}}
                ><Text style={{color:'white'}}>Test TableView</Text></TouchableOpacity>
*/
