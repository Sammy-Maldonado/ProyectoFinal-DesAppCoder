import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.redFF2929,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    minWidth: 180,
  },
  text: {
    color: colors.white,
    fontFamily: "Cabin",
    fontSize: 22,
  },
});
