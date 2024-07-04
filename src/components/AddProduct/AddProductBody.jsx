import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

import { COLORS } from "../../constants";
import { client } from "../../../config";
import CustomButton from "../common/customButton/CustomButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const AddProductBody = () => {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        logo: "",
        date_release: "",
        date_revision: "",
    });

    const sendData = async () => {
        try {
            console.log("formData: ", formData);
            const options = {
                method: "POST",
                url: "/bp/products",
                timeout: 5000,
                data: formData,
                headers: {
                    authorId: "526987100",
                },
            };
            const response = await client.request(options);
            navigation.navigate("Home");

            Toast.show({
                type: "success",
                text1: "Solicitud exitosa",
                text2: "Datos ingresados correctamente.",
                visibilityTime: 3000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Warning!",
                text2: "Algo inesperado sucedió, por favor inténtalo más tarde.",
                visibilityTime: 3000,
            });
            console.log("Error:", error);
        }
    };

    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={localStyles.scrollView}>
                <View style={localStyles.container}>
                    <Text style={localStyles.headerText}>
                        Formulario de registro
                    </Text>
                    <View>
                        <Text style={localStyles.label}>ID</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.id}
                            onChangeText={(text) => handleChange("id", text)}
                        />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Nombre</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.name}
                            onChangeText={(text) => handleChange("name", text)}
                        />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Descripción</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.description}
                            onChangeText={(text) =>
                                handleChange("description", text)
                            }
                        />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Logo</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.logo}
                            onChangeText={(text) => handleChange("logo", text)}
                        />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Fecha liberación</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.date_release}
                            onChangeText={(text) =>
                                handleChange("date_release", text)
                            }
                        />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Fecha revisión</Text>
                        <TextInput
                            style={localStyles.input}
                            value={formData.date_revision}
                            onChangeText={(text) =>
                                handleChange("date_revision", text)
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={localStyles.buttonContainer}>
                <CustomButton
                    backgroundColor={COLORS.yellow}
                    borderColor={COLORS.yellow}
                    textColor={COLORS.navBarColor}
                    action={sendData}
                    textContent="Enviar"
                    buttonStyles={{ width: "auto" }}
                />
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 300,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 55,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: "100%",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 10,
        alignSelf: "center",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: COLORS.black,
        fontWeight: "500",
    },
});

export default AddProductBody;
