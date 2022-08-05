import { Text, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Profile({ route }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>Profile Page</Text>
        </SafeAreaView>
    );
}
