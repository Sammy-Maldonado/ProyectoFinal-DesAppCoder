import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../global/colors";
import { Button } from "native-base";

const AddButton = ({
    title = "",
    onPress = () => { },
    color = colors.cyan00a2f9,
}) => {
    return (
        <View style={styles.addButtonContainer}>
            <Button style={{ ...styles.addButton, backgroundColor: color }}
                onPress={onPress}
            >
                <Text style={styles.addButtonText}>{title}</Text>
            </Button>
        </View>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    addButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    addButton: {
        height: 80,
        width: 200,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.cyan00a2f9,
        marginBottom: 20,
    },
    addButtonText: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.white,
        textAlign: 'center'
    },
});
