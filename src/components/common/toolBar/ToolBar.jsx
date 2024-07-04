import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import styles from "./toolBar.style";
import { StatusBar } from "expo-status-bar";

const ToolBar = () => {
    return (
        <View>
            <SafeAreaView style={styles.container}></SafeAreaView>
        </View>
    );
};

export default ToolBar;
