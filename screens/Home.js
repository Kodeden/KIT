import { SafeAreaView, Button, TouchableOpacity, StyleSheet, View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


export default function Home() {
    const navigation = useNavigation();


    return (
        <SafeAreaView>
        <View style={styles.mainPage}>
            <View style={styles.KIT}>
                <TextInput>Jeremy Eastman</TextInput>
                <TextInput style={styles.date}></TextInput>
                <TouchableOpacity>
                    <Image
                    style={styles.contactedBtn}
                    source={require("../assets/speechbubble.png")}>
                    </Image>
                </TouchableOpacity>
            </View>

        </View>
        <View style={styles.profileBtnCtn}>
            <TouchableOpacity 
                title="to Profile" 
                onPress={() => {navigation.navigate("Profile")}} 
                style={styles.button}
            ><Text>To Profiles</Text></TouchableOpacity>

            <TouchableOpacity
            title="New Friend"
            style={styles.button}
            ><Text>Add Friend</Text></TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainPage:{
        flex:5,
        flexDirection:'row',
    },

    profileBtnCtn:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
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

    button:{
        marginTop:651,
        height:40,
        width:80,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
    },

})
