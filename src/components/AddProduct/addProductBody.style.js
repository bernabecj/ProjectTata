import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
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
    errorInput: {
        borderColor: "red",
    },
    buttonContainer: {
        // flexDirection: "row",
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
    errorText: {
        color: "red",
        marginBottom: 20,
    },
})

export default styles