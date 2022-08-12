import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddFriend from "../screens/AddFriend";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import TestTableView from "../screens/TestTableView";


const Stack = createNativeStackNavigator();

export default function StackNavigator () {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="AddFriend" component={AddFriend} />
                <Stack.Screen name="TestTableView" component={TestTableView} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

