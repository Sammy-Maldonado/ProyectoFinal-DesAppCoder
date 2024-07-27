import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";

const InputForm = ({ label, onChange, error = "", isSecure = false, placeholder }) => {
  const [input, setInput] = useState("");
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        {input === '' && (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <TextInput
          placeholder=""
          style={styles.input}
          value={input}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
  },
  /* subtitle: {
    width: "90%",
    fontSize: 16,
    fontFamily: "Cabin",
  }, */
  inputWrapper: {
    width: "90%",
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    top: 6,
    left: 30,
    fontFamily: "CabinItalic",
    fontSize: 14,
    color: 'gray',
    opacity: 0.7, // Ajusta la opacidad del texto del placeholder
    paddingHorizontal: 2,
    paddingVertical: 4,
    zIndex: 1,
  },
  error: {
    paddintTop: 2,
    fontSize: 16,
    color: "red",
    fontFamily: "Cabin",
    fontStyle: "italic",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 0,
    padding: 2,
    fontFamily: "Cabin",
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.redFF9999,
    borderRadius: 7,
    paddingLeft: 15,
  },
});
