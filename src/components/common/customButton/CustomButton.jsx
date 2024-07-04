import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./customButton.style";
import { COLORS } from "../../../constants";

const CustomButton = ({
    backgroundColor: initialBackgroundColor,
    borderColor: initialBorderColor,
    textColor,
    type,
    action,
    textContent,
    newLocation,
    buttonStyles,
    showActivityIndicator,
}) => {
    const [backgroundColor, setBackgroundColor] = useState(
        initialBackgroundColor
    );
    const [borderColor, setBorderColor] = useState(initialBorderColor);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onPress = () => {
        if (action) {
            action();
        }
    };

    useEffect(() => {
        if (type === "confirmPick") {
            if (!newLocation) {
                setBackgroundColor(COLORS.grey3);
                setBorderColor(COLORS.grey3);
                setIsButtonDisabled(true);
            } else {
                setBackgroundColor("green");
                setBorderColor("green");
                setIsButtonDisabled(false);
            }
        }
    }, [newLocation]);

    return (
        <View style={{ margin: 10 }}>
            <TouchableOpacity
                disabled={isButtonDisabled}
                onPress={onPress}
                style={[
                    styles.button,
                    {
                        borderColor: borderColor,
                        backgroundColor: backgroundColor,
                        height: 50,
                    },
                    buttonStyles,
                ]}
            >
                {showActivityIndicator ? (
                    <ActivityIndicator
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        size="small"
                    />
                ) : (
                    <Text
                        style={{
                            color: textColor,
                            fontSize: 16,
                            fontWeight: "500",
                        }}
                    >
                        {textContent}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;
