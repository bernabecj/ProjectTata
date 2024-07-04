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
import { COLORS } from "../../../constants";
import { client } from "../../../../config";
import CustomButton from "../../common/customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const BodyHome = () => {
    const navigation = useNavigation();
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
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
                    <Text style={localStyles.headerText}>Products</Text>
                    <TextInput
                        style={localStyles.searchBar}
                        placeholder="Search..."
                    />
                    {loading && !refreshing ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : (
                        <View style={localStyles.gridContainer}>
                            {productsList.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        localStyles.gridItem,
                                        {
                                            width: "100%",
                                            borderBottomWidth:
                                                index ===
                                                productsList.length - 1
                                                    ? 0
                                                    : 1,
                                            borderBottomColor: "#ccc",
                                        },
                                    ]}
                                    onPress={() => {
                                        navigation.navigate("EditProduct", {
                                            product: product,
                                        });
                                    }}
                                >
                                    <View style={localStyles.leftText}>
                                        <Text
                                            style={localStyles.leftTextContent}
                                        >
                                            {product.name}{" "}
                                        </Text>
                                    </View>
                                    <View style={localStyles.bottomText}>
                                        <Text
                                            style={
                                                localStyles.bottomTextContent
                                            }
                                        >
                                            ID: {product.id}{" "}
                                        </Text>
                                    </View>
                                    <View style={localStyles.middleCenterText}>
                                        <Text
                                            style={
                                                localStyles.middleCenterTextContent
                                            }
                                        >
                                            <AntDesign
                                                name="right"
                                                size={24}
                                                color={COLORS.grey}
                                            />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            <View style={localStyles.buttonContainer}>
                <CustomButton
                    backgroundColor={COLORS.yellow}
                    borderColor={COLORS.yellow}
                    textColor={COLORS.navBarColor}
                    action={() => {
                        navigation.navigate("AddProduct");
                    }}
                    textContent="Agregar"
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
        marginBottom: 100,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    searchBar: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
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
});

export default BodyHome;
