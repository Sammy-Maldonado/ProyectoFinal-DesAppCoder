import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../global/colors'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../features/User/UserSlice';
import { useGetProfileimageQuery, usePostProfileImageMutation } from '../services/shopServices';
import AddButton from '../components/AddButton';
import { LinearGradient } from "expo-linear-gradient";


const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);

  const dispatch = useDispatch();

  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileimageQuery(localId);
  //console.log(localId)


  const defaultImageRoute = "../../assets/user.png";

  const pickLibraryImage = async () => {
    try {
      setIsImageFromCamera(false)
      const permissionGallery = await verifyGalleryPermissions()
      if (permissionGallery) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
        })

        //console.log(result);

        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`
          setImage(image)
        }
      }
    } catch (error) {
      //console.log(error)
    }
  }

  const verifyGalleryPermissions = async () => {
    const { granted } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return granted;
  };

  const verifyCameraPermisson = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (!status) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermisson();
    setIsImageFromCamera(true);
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      });

      //console.log(result);

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  };

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      if (isImageFromCamera) {
        navigation.navigate("My Profile");
        ExpoLibrary.createAssetAsync(imageURI);

      }
      navigation.goBack();
    } catch (error) {
      //console.log(error);
    }
  };

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
          {image || imageFromBase ? (
            <>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={{ uri: image || imageFromBase?.image }}
              />
              <AddButton title="Tomar otra foto" onPress={pickImage} />

              <AddButton
                title="Subir foto desde la galeria"
                onPress={pickLibraryImage}
              />

              <AddButton title="Confirmar Foto" onPress={confirmImage} />
            </>
          ) : (
            <>
              <Image
                style={styles.img}
                resizeMode="cover"
                source={require(defaultImageRoute)}
              />
              <AddButton title="Tomar otra foto" onPress={pickImage} />
              <AddButton
                title="Subir foto desde la galeria"
                onPress={pickLibraryImage}
              />
            </>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

export default ImageSelector

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
    backgroundColor: colors.green700,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5
  }
})
