import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native'
import { colors } from '../global/colors'
import AddButton from '../components/AddButton'

import { useDispatch, useSelector } from "react-redux";
import { useGetProfileimageQuery } from '../services/shopServices'
import { clearUser } from '../features/User/UserSlice';
//import { truncateSessionsTable } from "../persistence";
import { useDB } from '../hooks/useDB'; // importar session

import { LinearGradient } from "expo-linear-gradient";

const MyProfile = ({ navigation }) => {

  const dispatch = useDispatch()
  const { truncateSessionTable } = useDB() // preparo el metodo
  const { imageCamera, localId } = useSelector((state) => state.auth.value)
  const { data: imageFromBase } = useGetProfileimageQuery(localId)
  const launchCamera = async () => {
    navigation.navigate("Image Selector");
  };

  const launchLocation = async () => {
    navigation.navigate("List Address");
  };

  const defaultImageRoute = "../../assets/user.png";

  const signOut = async () => {
    try {
      const response = await truncateSessionTable(); // borro la session
      //console.log(response); 
      dispatch(clearUser());
    } catch (error) {
      //console.log({ errorSignOutDB: error });
    }
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
          {imageFromBase || imageCamera ? (
            <Image
              source={{ uri: imageFromBase?.image || imageCamera }}
              style={styles.img}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.img}
              resizeMode="cover"
              source={require(defaultImageRoute)}
            />
          )}
          <AddButton
            onPress={launchCamera}
            title={
              imageFromBase || imageCamera
                ? "Modificar foto de perfil"
                : "Subir foto de perfil"
            }
          />
          <AddButton title="Mi dirección" onPress={launchLocation} />
          <AddButton onPress={signOut} title="Cerrar sesión" />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

export default MyProfile

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
    alignItems: 'center',
    paddingTop: 40,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 40
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.redFFE5E5,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5
    
  }
})
