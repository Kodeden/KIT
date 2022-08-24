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
                <Stack.Screen name="Home"
                    options={{headerStyle:{backgroundColor:'#CDCDCD'}}} 
                    component={Home} />
                <Stack.Screen name="Profile"
                    options={{headerStyle:{backgroundColor:'#CDCDCD'}}}
                    component={Profile} />
                <Stack.Screen name="AddFriend" 
                    options={{headerStyle:{backgroundColor:'#CDCDCD'}}}
                    component={AddFriend} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

