import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React ,{useEffect}from "react";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { useSelector, useDispatch } from "react-redux";


export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friendList)


    


    return (
        <SafeAreaView>
            <View style={styles.mainPage}>
                <View style={styles.KIT}>
                    {friends.map((friends) => (
                    <View key={friends.id} style={styles.friendsContainer}>
                    <Text style={styles.friends}>{friends.firstName} {friends.lastName} {friends.date}</Text>
                    </View>
                    ))}
                            <TouchableOpacity>
                                <Image
                                style={styles.contactedBtn}
                                source={require("../assets/speechbubble.png")}
                                onPress={() => dispatch(dateStamp({date: Date(), id: friends.id}))}>
                                </Image>
                            </TouchableOpacity>

                </View>

            </View>
            <View style={styles.navBtnCtn}>
                <TouchableOpacity 
                    title="to Profile" 
                    onPress={() => {navigation.navigate("Profile")}} 
                    style={styles.button}
                ><Text style={{color:'white'}}>To Profiles</Text></TouchableOpacity>

                <TouchableOpacity
                title="New Friend"
                style={styles.button}
                onPress={() => {navigation.navigate("AddFriend")}}
                ><Text style={{color:'white'}}>Add Friend</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainPage:{
        flex:5,
        flexDirection:'row',
    },

    navBtnCtn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:2,
    },

    KIT:{
        height:650,
        width:390,
        borderWidth:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginRight: 15,
        marginLeft:1,
    },

    date:{
        width:100,
    },

    contactedBtn:{
        height:30,
        width:30,
    },

    friends:{},

    friendsContainer:{},

    button:{
        marginTop:651,
        height:40,
        width:80,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
    },

})




//{friendsList.map((friends) => (
   // <View key={friends.id} style={styles.friendsContainer}>
    //<Text style={styles.friends}>{friends.firstName} {friends.lastName} {friends.date}</Text>
    //</View>
//))}