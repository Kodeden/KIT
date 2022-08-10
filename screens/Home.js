import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React ,{useEffect}from "react";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { useSelector, useDispatch } from "react-redux";
import { format, compareAsc } from 'date-fns'


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
                        <Text style={styles.friends}>{friends.firstName} {friends.lastName}</Text> 
                        <Text style={styles.friends}>{friends.date}</Text>

                    <TouchableOpacity>
                        <Image
                        style={styles.contactedBtn}
                        source={require("../assets/speechbubble.png")}
                        onPress={() => dispatch(dateStamp({date: Date(), id: friends.id}))}>
                        </Image>
                    </TouchableOpacity>

                    </View>
                    ))}            
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

    KIT:{
        height:650,
        width:390,
        borderWidth:3,
        marginRight: 15,
        marginLeft:1,
    },

    contactedBtn:{
        height:30,
        width:30,
    },

    friends:{},

    friendsContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },

    navBtnCtn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:2,
    },

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