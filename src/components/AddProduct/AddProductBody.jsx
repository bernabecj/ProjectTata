import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { client } from "../../../config";
import CustomButton from "../common/customButton/CustomButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import styles from "./addProductBody.style";

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

    const [errors, setErrors] = useState({});

    const validateForm = async () => {
        const newErrors = {};

        // Validate ID
        if (!formData.id || formData.id.length < 3 || formData.id.length > 10) {
            newErrors.id = "ID requerido, entre 3 y 10 caracteres.";
        } else {
            try {
                const response = await client.get(
                    `/bp/products/verification?id=${formData.id}`
                );
                if (response.data) {
                    newErrors.id = "El ID ya existe.";
                }
            } catch (error) {
                newErrors.id = "Error al verificar el ID.";
            }
        }

        // Validate Name
        if (
            !formData.name ||
            formData.name.length < 5 ||
            formData.name.length > 100
        ) {
            newErrors.name = "Nombre requerido, entre 5 y 100 caracteres.";
        }

        // Validate Description
        if (
            !formData.description ||
            formData.description.length < 10 ||
            formData.description.length > 200
        ) {
            newErrors.description =
                "Descripción requerida, entre 10 y 200 caracteres.";
        }

        // Validate Logo
        if (!formData.logo) {
            newErrors.logo = "Logo requerido.";
        }

        // Validate Date Release
        const today = new Date().toISOString().split("T")[0];
        if (!formData.date_release || formData.date_release < today) {
            newErrors.date_release =
                "Fecha de liberación debe ser igual o mayor a hoy.";
        } else {
            const releaseDate = new Date(formData.date_release);
            if (isNaN(releaseDate.getTime())) {
                newErrors.date_release = "Fecha de liberación inválida.";
            }
        }

        // Validate Date Revision
        if (formData.date_release) {
            const releaseDate = new Date(formData.date_release);
            const oneYearLater = new Date(releaseDate);
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
            const expectedRevisionDate = oneYearLater
                .toISOString()
                .split("T")[0];

            if (
                !formData.date_revision ||
                formData.date_revision !== expectedRevisionDate
            ) {
                newErrors.date_revision = `Fecha de revisión debe ser exactamente un año después de la fecha de liberación (${expectedRevisionDate}).`;
            } else {
                const revisionDate = new Date(formData.date_revision);
                if (isNaN(revisionDate.getTime())) {
                    newErrors.date_revision = "Fecha de revisión inválida.";
                }
            }
        } else {
            newErrors.date_revision =
                "Fecha de liberación requerida para validar la fecha de revisión.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendData = async () => {
        if (await validateForm()) {
            try {
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
        }
    };

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            description: "",
            logo: "",
            date_release: "",
            date_revision: "",
        });
        setErrors({});
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
                        Formulario de registro
                    </Text>

                    <View>
                        <Text style={styles.label}>ID</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.id && styles.errorInput,
                            ]}
                            value={formData.id}
                            onChangeText={(text) => handleChange("id", text)}
                        />
                        {errors.id && (
                            <Text style={styles.errorText}>{errors.id}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.name && styles.errorInput,
                            ]}
                            value={formData.name}
                            onChangeText={(text) => handleChange("name", text)}
                        />
                        {errors.name && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.description && styles.errorInput,
                            ]}
                            value={formData.description}
                            onChangeText={(text) =>
                                handleChange("description", text)
                            }
                        />
                        {errors.description && (
                            <Text style={styles.errorText}>
                                {errors.description}
                            </Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Logo</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.logo && styles.errorInput,
                            ]}
                            value={formData.logo}
                            onChangeText={(text) => handleChange("logo", text)}
                        />
                        {errors.logo && (
                            <Text style={styles.errorText}>{errors.logo}</Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Fecha de liberación</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.date_release && styles.errorInput,
                            ]}
                            value={formData.date_release}
                            onChangeText={(text) =>
                                handleChange("date_release", text)
                            }
                        />
                        {errors.date_release && (
                            <Text style={styles.errorText}>
                                {errors.date_release}
                            </Text>
                        )}
                    </View>

                    <View>
                        <Text style={styles.label}>Fecha de revisión</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.date_revision && styles.errorInput,
                            ]}
                            value={formData.date_revision}
                            onChangeText={(text) =>
                                handleChange("date_revision", text)
                            }
                        />
                        {errors.date_revision && (
                            <Text style={styles.errorText}>
                                {errors.date_revision}
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <CustomButton
                    backgroundColor={COLORS.yellow}
                    borderColor={COLORS.yellow}
                    textColor={COLORS.navBarColor}
                    action={sendData}
                    textContent="Agregar"
                    buttonStyles={{ width: "auto" }}
                />
                <CustomButton
                    backgroundColor={COLORS.kindWhite}
                    borderColor={COLORS.kindWhite}
                    textColor={COLORS.navBarColor}
                    action={resetForm}
                    textContent="Reiniciar"
                    buttonStyles={{ width: "auto", marginLeft: 10 }}
                />
            </View>
        </View>
    );
};

export default AddProductBody;
