import { SafeAreaView, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Button title="to Profile" onPress={() => {navigation.navigate("Profile", {id: 31})}} ></Button>
        </SafeAreaView>
    );
}
