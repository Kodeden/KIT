import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddFriend from "../screens/AddFriend";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function StackNavigator () {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="AddFriend" component={AddFriend} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

