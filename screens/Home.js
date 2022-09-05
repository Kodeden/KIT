import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image, ScrollView } from "react-native";
import React, { useState }from "react";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp } from "../redux/FriendListSlice";
import { useSelector, useDispatch } from "react-redux";
import convertUTCToLocalTime, {convertToMilliseconds} from "../functions/DateConversion";
import Modal from "react-native-modal";



export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friendList);
    const today = convertToMilliseconds(new Date());
    const ONE_MONTH = 2678400000;

    const sortedList = friends.slice().sort((a, b) => a.date.localeCompare(b.date));

    const [filteredText, setFilteredText] = useState("");

    const [isHelpVisible, setHelpVisible] = useState(false);
    const toggleHelp = () => {
          setHelpVisible(!isHelpVisible);
        };
    
   
    return (
        <SafeAreaView style={styles.fullpage}> 
            <View style={styles.filter}><TextInput
                placeholder="Filter Friends"
                value={filteredText}
                onChangeText={setFilteredText}
            ></TextInput></View>

            <View style={styles.helpPopUp}>
                <Modal isVisible={isHelpVisible}>
                    <View style={styles.helpMessage}>
                        <View style={styles.welcomeHelp}>
                            <Text style={{color:'#DDD', fontSize:20}}>
                                Hello! Welcome to KIT, your Keep In Touch assistant!
                            </Text>
                        </View>
                        <View style={styles.speechExplain}>
                            <View>
                                <Image
                                style={styles.contactedBtn}
                                source={require("../assets/greyspeechbubble.png")}></Image>
                            </View>
                            <View style={styles.speechExpText}>
                                <Text style={{color:'#DDD', fontSize:20}} >
                                    This button will update the contact date for when you last contacted a friend.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.profileHelp}>
                            <View>
                                <Image
                                    style={styles.profileBtn}
                                    source={require("../assets/emptyAvatar4.png")}>                           
                                </Image>
                            </View>
                            <View style={styles.profileHlpText}>
                                <Text style={{color:'#DDD', fontSize:20}}>
                                    This button will bring you to the profile page.
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                        style={styles.button}
                        onPress={toggleHelp}
                        ><Text style={{color:'#DDD'}}>Hide Help</Text></TouchableOpacity>
                    </View>
                </Modal>
            </View>

            <ScrollView>    
                <View style={styles.mainPage}>
                    <View style={styles.KIT}>
                        {sortedList.filter(name => (name.firstName+name.lastName).toLocaleLowerCase().includes(filteredText.toLocaleLowerCase())).map((friend) => (
                        friend.id !== 0 ? (
                        <View key={friend.id} style={styles.friendsContainer}>    
                            <Text style={(today - convertToMilliseconds(friend.date) < ONE_MONTH) ? styles.friends : styles.overdue}>{friend.firstName} {friend.lastName}</Text> 
                            <Text style={(today - convertToMilliseconds(friend.date) < ONE_MONTH) ? styles.friends : styles.overdue}>{convertUTCToLocalTime(friend.date)}</Text>

                            <TouchableOpacity
                                onPress={() => {navigation.navigate("Profile", {id: friend.id})}}
                                style={styles.touchableButton}>
                                <Image
                                style={styles.profileBtn}
                                source={require("../assets/emptyAvatar4.png")}>                           
                                </Image>
                            </TouchableOpacity>  


                            <TouchableOpacity
                                onPress={() => dispatch(dateStamp({date: new Date().toISOString(), id: friend.id}))}
                                style={styles.touchableButton}>
                                <Image
                                style={styles.contactedBtn}
                                source={require("../assets/greyspeechbubble.png")}
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
                ><Text style={{color:'#DDD', fontFamily:'notoserif'}}>Add Friend</Text></TouchableOpacity>

                <TouchableOpacity
                title="Help"
                style={styles.button}
                onPress={toggleHelp}
                ><Text style={{color:'#DDD', fontFamily:'notoserif'}}>Help</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullpage:{
        backgroundColor:'#001525',
    },

    mainPage:{
        flex:5,
        flexDirection:'row',
        backgroundColor:'#001525',
    },

    filter:{
       borderWidth:1,
       width:"90%",
       marginLeft:"5%",
       marginBottom:5,
       marginTop:5,
       borderRadius:20,
       paddingLeft:10, 
       backgroundColor:'#DDD',

    },

    KIT:{
        height:635,
        width:390,
        borderWidth:1,
        marginRight: 15,
        marginLeft:1,
        

    },

    helpMessage:{
        height:400,
        width:300,
        marginLeft:25,
        alignItems:"center",
        justifyContent:"space-around"
    },

    speechExplain:{
        flexDirection:"row",
        alignItems:"center",
    },

    speechExpText:{
        marginLeft:20,
        width:250,
    },

    profileHelp:{
        flexDirection:"row",
        alignItems:"center",
    },

    profileHlpText:{
        marginLeft:20,
        width:250, 
    },

    contactedBtn:{
        height:30,
        width:35,
        
    },

    profileBtn:{
        height:30,
        width:30,
    },

    friends:{
        flex: 4,
        fontFamily:'notoserif' ,
        fontSize:18, 
        color:'#DDD',
        borderBottomWidth:1,
        borderColor:"#DDD",
        marginTop:4,
        paddingBottom:5,   
    },

    overdue:{
        flex: 4,
        fontFamily:'notoserif' ,
        fontSize:18, 
        color:'#F33',
        borderBottomWidth:1,
        borderColor:"#DDD",
        marginTop:4,
        paddingBottom:5,   
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
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#CDCDCD',
    },

    button:{
        height:40,
        width:80,
        backgroundColor:'#001525',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
        paddingTop:2,
        marginBottom: 30,
    },

})

