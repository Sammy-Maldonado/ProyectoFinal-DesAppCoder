import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";
import { LinearGradient } from "expo-linear-gradient";
//import { NativeBaseProvider, Button } from "native-base";

import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";

import { useDB } from "../hooks/useDB"; // importo el hook

const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch()

  const [triggerSignIn, result] = useSignInMutation()

  const { insertSession } = useDB();  // peparo el metodo

  useEffect(() => {
    if (result?.data && result.isSuccess) {
      insertSession({              // inserto la session
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
        .then((response) => {
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            })
          );
        })
        .catch((err) => console.log(err))
    }
  }, [result])

  const onSubmit = () => {
    triggerSignIn({ email, password, returnSecureToken: true })
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
        <View style={styles.main}>
          <View style={styles.container}>
            <Text style={styles.title}>Churulandia</Text>
            <InputForm label={"email"} placeholder={"email"} onChange={setEmail} error={""} />
            <InputForm
              label={"password"}
              placeholder={"password"}
              onChange={setPassword}
              error={""}
              isSecure={true}
            />
            <View style={styles.subContainer} >
              <SubmitButton onPress={onSubmit} title="Ingresar" />
              <Text style={styles.sub}>¿No tienes cuenta?</Text>

              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.subLink}>Crear cuenta</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    flex: 1,
  },
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "70%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 15,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  title: {
    fontSize: 45,
    fontFamily: "CabinItalic",
    color: colors.red,
  },
  sub: {
    fontSize: 14,
    color: "black",
    marginTop: 10,
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
  subContainer: {
    width: "90%",
    gap: 10,
    alignItems: "center",
  },
});
