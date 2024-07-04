import React, { useEffect, useState } from "react";
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

const EditProductBody = () => {
    const navigation = useNavigation();
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true); // Set loading to true when fetching
            const options = {
                method: "GET",
                url: `/bp/products`,
                timeout: 5000,
                headers: {
                    authorId: "526987100",
                },
            };
            const response = await client.request(options);
            if (response.data.length > 0) {
                setProductsList(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false after fetching
            setRefreshing(false); // Set refreshing to false after fetch or on error
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={localStyles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            >
                <View style={localStyles.container}>
                    <Text style={localStyles.headerText}>
                        Formulario de registro
                    </Text>
                    <View>
                        <Text style={localStyles.label}>ID</Text>
                        <TextInput style={localStyles.input} />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Nombre</Text>
                        <TextInput style={localStyles.input} />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Descripción</Text>
                        <TextInput style={localStyles.input} />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Logo</Text>
                        <TextInput style={localStyles.input} />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Fecha liberación</Text>
                        <TextInput style={localStyles.input} />
                    </View>

                    <View>
                        <Text style={localStyles.label}>Fecha revisión</Text>
                        <TextInput style={localStyles.input} />
                    </View>
                </View>
            </ScrollView>
            <View style={localStyles.buttonContainer}>
                <CustomButton
                    backgroundColor={COLORS.yellow}
                    borderColor={COLORS.yellow}
                    textColor={COLORS.navBarColor}
                    action={() => {
                        navigation.navigate("EditProduct");
                    }}
                    type="quitModal"
                    textContent="Agregar"
                    buttonStyles={{ width: "auto" }}
                />

                {/* <CustomButton
                    backgroundColor={COLORS.blue}
                    borderColor={COLORS.blue}
                    textColor={COLORS.navBarColor}
                    action={() => {
                        navigation.navigate("EditProduct");
                    }}
                    type="quitModal"
                    textContent="Eliminar"
                    buttonStyles={{ width: "auto" }}
                /> */}
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
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    gridItem: {
        height: 60,
        padding: 10,
        position: "relative",
    },
    leftText: {
        position: "absolute",
        top: 10,
        left: 20,
    },
    leftTextContent: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomText: {
        position: "absolute",
        bottom: 10,
        left: 20,
    },
    bottomTextContent: {
        fontSize: 14,
        color: COLORS.grey2,
    },
    middleCenterText: {
        position: "absolute",
        top: "80%",
        right: 20,
        transform: [{ translateY: -12 }],
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

export default EditProductBody;
