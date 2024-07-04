import { View, Text, StyleSheet } from "react-native";
import React from "react";
import styles from "./header.style"; // Assuming you have some additional styles in homeHeader.style
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="credit-card-multiple-outline"
                    size={24}
                    color="#00267F" // Changed color to match the text
                />
                <Text style={styles.headerText}>BANCO</Text>
            </View>
            <View
                style={{
                    alignSelf: "center",
                    borderBottomColor: COLORS.grey,
                    width: "100%",
                    borderBottomWidth: 1,
                }}
            />
        </View>
    );
};

export default Header;
