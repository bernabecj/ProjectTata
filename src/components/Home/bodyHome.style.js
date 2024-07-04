import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
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
})

export default styles