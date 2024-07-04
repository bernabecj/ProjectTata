import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { client } from "../../../config";
import CustomButton from "../common/customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import styles from "./editProductBody.style";

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
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.headerText}>
                        Formulario de actualización
                    </Text>
                    <View>
                        <Text style={styles.label}>ID</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.id}
                            onChangeText={(text) => handleChange("id", text)}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.name}
                            onChangeText={(text) => handleChange("name", text)}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.description}
                            onChangeText={(text) =>
                                handleChange("description", text)
                            }
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Logo</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.logo}
                            onChangeText={(text) => handleChange("logo", text)}
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Fecha liberación</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.date_release}
                            onChangeText={(text) =>
                                handleChange("date_release", text)
                            }
                        />
                    </View>

                    <View>
                        <Text style={styles.label}>Fecha revisión</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.date_revision}
                            onChangeText={(text) =>
                                handleChange("date_revision", text)
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
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
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirmar eliminación</Text>
                    <View
                        style={{
                            alignSelf: "center",
                            borderBottomColor: COLORS.grey,
                            width: "100%",
                            borderBottomWidth: 1,
                            marginVertical: 15,
                        }}
                    />
                    <Text style={styles.modalText}>
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
                    <View style={styles.modalButtonContainer}>
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

export default EditProductBody;
