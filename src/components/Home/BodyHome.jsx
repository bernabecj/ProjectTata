import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { client } from "../../../config";
import CustomButton from "../common/customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "./bodyHome.style";

const BodyHome = () => {
    const navigation = useNavigation();
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const filteredProducts = productsList.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            >
                <View style={styles.container}>
                    <Text style={styles.headerText}>Products</Text>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {loading && !refreshing ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : (
                        <View style={styles.gridContainer}>
                            {filteredProducts.map((product, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.gridItem,
                                        {
                                            width: "100%",
                                            borderBottomWidth:
                                                index ===
                                                filteredProducts.length - 1
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
                                    <View style={styles.leftText}>
                                        <Text style={styles.leftTextContent}>
                                            {product.name}{" "}
                                        </Text>
                                    </View>
                                    <View style={styles.bottomText}>
                                        <Text style={styles.bottomTextContent}>
                                            ID: {product.id}{" "}
                                        </Text>
                                    </View>
                                    <View style={styles.middleCenterText}>
                                        <Text
                                            style={
                                                styles.middleCenterTextContent
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
            <View style={styles.buttonContainer}>
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

export default BodyHome;
