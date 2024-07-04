import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { client } from "../../../config";
import CustomButton from "../common/customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

const EditProductBody = ({ route }) => {
    const navigation = useNavigation();
    const { product } = route.params;
    const [formData, setFormData] = useState({
        id: product.id || "",
        name: product.name || "",
        description: product.description || "",
        logo: product.logo || "",
        date_release: product.date_release || "",
        date_revision: product.date_revision || "",
    });
    const [isModalVisible, setModalVisible] = useState(false);

    const updateProduct = async () => {
        try {
            const options = {
                method: "PUT",
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

    const deleteProduct = async () => {
        setModalVisible(false); // Hide the modal
        try {
            const options = {
                method: "DELETE",
                url: `bp/products?id=${product.id}`,
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
                text2: "Datos eliminados correctamente.",
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
                    action={updateProduct}
                    textContent="Actualizar"
                    buttonStyles={{ width: "auto" }}
                />

                <CustomButton
                    backgroundColor={COLORS.kindWhite}
                    borderColor={COLORS.kindWhite}
                    textColor={COLORS.navBarColor}
                    action={() => setModalVisible(true)}
                    textContent="Eliminar"
                    buttonStyles={{ width: "auto" }}
                />
            </View>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={localStyles.modal}
            >
                <View style={localStyles.modalContent}>
                    <Text style={localStyles.modalTitle}>
                        Confirmar eliminación
                    </Text>
                    <View
                        style={{
                            alignSelf: "center",
                            borderBottomColor: COLORS.grey,
                            width: "100%",
                            borderBottomWidth: 1,
                            marginVertical: 15,
                        }}
                    />
                    <Text style={localStyles.modalText}>
                        ¿Estás seguro de que deseas eliminar el producto con id:{" "}
                        {product.id}?
                    </Text>
                    <View
                        style={{
                            alignSelf: "center",
                            borderBottomColor: COLORS.grey,
                            width: "100%",
                            borderBottomWidth: 1,
                            marginVertical: 15,
                        }}
                    />
                    <View style={localStyles.modalButtonContainer}>
                        <CustomButton
                            backgroundColor={COLORS.yellow}
                            borderColor={COLORS.yellow}
                            textColor={COLORS.navBarColor}
                            action={deleteProduct}
                            textContent="Confirmar"
                        />
                        <CustomButton
                            backgroundColor={COLORS.kindWhite}
                            borderColor={COLORS.kindWhite}
                            textColor={COLORS.navBarColor}
                            action={() => setModalVisible(false)}
                            textContent="Cancelar"
                            buttonStyles={{ marginRight: 10 }}
                        />
                    </View>
                </View>
            </Modal>
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
        marginBottom: 150,
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
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        // marginBottom: 12,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtonContainer: {
        margin: "auto",
    },
});

export default EditProductBody;
