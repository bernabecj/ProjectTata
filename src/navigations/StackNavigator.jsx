import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens";
import { COLORS, SIZES, images, icons } from "../constants";
import { View, SafeAreaView } from "react-native";
import { ToolBar } from "../components";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: true,
                    title: "Home Page",
                    headerBackTitleVisible: false,
                    headerTintColor: COLORS.white,
                    header: () => (
                        <View>
                            <ToolBar />
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
