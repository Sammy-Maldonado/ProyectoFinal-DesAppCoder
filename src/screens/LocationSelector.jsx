import { StyleSheet, Text, View, ImageBackground } from "react-native"
import React, { useEffect, useState } from "react"
import { colors } from "../global/colors"
import AddButton from "../components/AddButton"
import MapPreview from "../components/MapPreview"

import * as Location from "expo-location"

import { googleMapsApiKey } from "../databases/googleMaps"
import { usePostLocationMutation } from "../services/shopServices"
import { useSelector } from "react-redux"

import { LinearGradient } from "expo-linear-gradient";



const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" })
  const [address, setAddres] = useState("")
  const [error, setError] = useState("")

  const [triggerPostUserLocation, result] = usePostLocationMutation()
  const { localId } = useSelector(state => state.auth.value)


  useEffect(() => {
    // IIFE

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          //console.log(location);
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }

      } catch (error) {
        //console.log(error);
      }

    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
          const response = await fetch(url_reverse_geocode);
          const data = await response.json();
          console.dir(data)
          setAddres(data.results[0].formatted_address)
        }
      } catch (error) {

      }
    })()
  }, [location])


  const onConfirmAddress = () => {

    const date = new Date()

    triggerPostUserLocation({
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        address: address,
        updatedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      },
      localId: localId
    })
    navigation.navigate("List Address")
  }

  return (
    <ImageBackground
      source={require('../../assets/churu_salmon.jpg')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.92)', 'rgba(255, 255, 255, 0.92)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Mi dirección</Text>
          {location ? (
            <>
              <Text style={styles.text2}>
                Lat: {location.latitude}, Long: {location.longitude}.
              </Text>

              <MapPreview style={styles.map} location={location} />
              <Text style={styles.address}>Dirección: {address}</Text>
              <AddButton onPress={onConfirmAddress} title="Confirmar dirección" />
            </>
          ) : (
            <>
              <View style={styles.noLocationContainer}>
                <Text>{error}</Text>
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

export default LocationSelector

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
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    paddingTop: 20,
    fontFamily: "Cabin",
    fontSize: 20
  },
  text2: {
    paddingTop: 20,
    fontFamily: "Cabin",
    fontSize: 20,
    paddingBottom: 20,
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.green300,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 30,
    fontSize: 18,
  }
})
