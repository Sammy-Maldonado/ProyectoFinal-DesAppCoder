import React, { useEffect, useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ImageBackground
} from "react-native";
import { colors } from "../global/colors";
import { LinearGradient } from "expo-linear-gradient";


import { useGetProductByIdQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import { Button } from "native-base";
import { useToast } from 'native-base';


const ItemDetail = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  //  const [product, setProduct] = useState(null);
  const { productoId: idSelected } = route.params;

  const dispatch = useDispatch()

  const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected);

  const toast = useToast();

  //console.log("width: " + width);
  //console.log("heigth: " + height);

  // Landscape: Horisontal
  // Portraint: Vertical
  useEffect(() => {
    if (width > height) setOrientation("landscape");
    else setOrientation("portrait");
  }, [width, height]);

  const handleAddCart = () => {
    // agregar al carrito
    dispatch(addCartItem({ ...product, quantity: 1 }))
    toast.show({
      description: "Producto agregado al carrito", // Mensaje del toast
      duration: 3000, // Opcional: duración en milisegundos
      bg: colors.cyan00a2f9,
    });
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
        <View>
            <Button style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Volver</Text>
            </Button>
          {product ? (
            <View
              style={
                orientation === "portrait"
                  ? styles.mainContainer
                  : styles.mainContainerLandscape
              }
            >
              <Image
                source={{ uri: product.images[0] }}
                style={
                  orientation === "portrait" ? styles.image : styles.imageLandscape
                }
                resizeMode="contain"
              />
              <View
                style={
                  orientation === "portrait"
                    ? styles.textContainer
                    : styles.textContainerLandscape
                }
              >
                <Text style={styles.productTitle} >{product.title}</Text>
                <Text style={styles.productDescription} >{product.description}</Text>
                <Text style={styles.price}>${product.price}</Text>

                <View style={styles.buttonContainer}>
                  <Button style={styles.addButton} onPress={handleAddCart}>
                    <Text style={styles.addButtonText}>Agregar al carrito</Text>
                  </Button>
                </View>

                <View style={styles.buttonContainer}>
                  
                </View>

              </View>
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </ImageBackground >
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 30,
    marginBottom: 20,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },

  textContainer: {
    flexDirection: "column",
    padding: 30,
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: {
    textAlign: "right",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 18,
  },
  backButton: {
    height: 40,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cyan00a2f9,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  addButton: {
    height: 50,
    width: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cyan00a2f9,
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  buttonContainer: {
    alignItems: 'center'
  }
});
