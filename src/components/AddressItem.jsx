import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { colors } from "../global/colors";

const AddressItem = ({ location, navigation }) => {

  const onChangeLocation = () => {
    navigation.navigate('Location Selector')
  }

  return (
    <View style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{location.address}</Text>
      </View>
      <Pressable onPress={onChangeLocation}>
        <View style={styles.locationContainer}>
          <Entypo name="location" size={30} color="black">
          </Entypo>
          <Text style={styles.text2}>Cambiar</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.redFFE5E5,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  text: {
    fontFamily: "Cabin",
    fontSize: 17,
    color: colors.black,
  },
  locationContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },
  text2: {
    fontFamily: "Cabin",
    fontSize: 19,
    color: colors.black,
    padding: 2
  },
});
