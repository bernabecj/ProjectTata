import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'

const styles = StyleSheet.create({
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
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtonContainer: {
        margin: "auto",
    },
})

export default styles