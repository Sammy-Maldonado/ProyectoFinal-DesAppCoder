import { StyleSheet, Text, View, ImageBackground } from "react-native"
import React, { useState } from "react"
import AddButton from "../components/AddButton"
import AddressItem from "../components/AddressItem"
import { useSelector } from "react-redux"
import { useGetLocationQuery } from "../services/shopServices"

import { LinearGradient } from "expo-linear-gradient";


const ListAddress = ({ navigation }) => {
  //const [location, setLocation] = useState(null)
  const { localId } = useSelector((state) => state.auth.value)
  const { data: location } = useGetLocationQuery(localId)
  return location ? (
    <ImageBackground
      source={require('../../assets/churu_salmon.jpg')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.92)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <AddressItem
            location={location}
            navigation={navigation}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require('../../assets/churu_salmon.jpg')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.92)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <Text style={styles.text}>No hay ubicación establecida</Text>
          <AddButton
            title="Establecer localización"
            onPress={() => navigation.navigate("Location Selector")}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

export default ListAddress

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 25
  },
  text: {
    paddingVertical: 20,
    fontFamily: "Cabin",
    fontSize: 20,
    marginBottom: 25
  }
})
