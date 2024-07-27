import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../global/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/User/UserSlice";
import { signupSchema } from "../validations/singUpScheme";
import { LinearGradient } from "expo-linear-gradient";



const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      )
    }
  }, [result])

  const onSubmit = () => {
    try {

      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({ email, password, confirmPassword })
      triggerSignUp({ email, password, returnSecureToken: true })

    } catch (err) {

      //console.log("Entro al signup del error");
      //console.log(err.path);
      //console.log(err.message);
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
        case "password":
          setErrorPassword(err.message);
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
        default:
          break;
      }

    }
  }

  //console.log(result)

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
            <Text style={styles.title}>Crear cuenta</Text>
            <InputForm
              label={"email"}
              placeholder={"email"}
              onChange={setEmail}
              error={errorMail}
            />
            <InputForm
              label={"password"}
              placeholder={"password"}
              onChange={setPassword}
              error={errorPassword}
              isSecure={true}
            />
            <InputForm
              label={"confirm password"}
              placeholder={"confirm password"}
              onChange={setconfirmPassword}
              error={errorConfirmPassword}
              isSecure={true}
            />
            <View style={styles.subContainer} >
              <SubmitButton onPress={onSubmit} title="Crear Cuenta" />
              <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.subLink}>Ingresar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Signup;

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
    fontFamily: "Cabin",
    color: "black",
    marginTop: 10,
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Cabin",
    color: "blue",
  },
  subContainer: {
    width: "90%",
    gap: 10,
    alignItems: "center",
  },
});
