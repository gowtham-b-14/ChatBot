import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootSatckParamList } from "../App";
import { loginValidationSchema } from "../components/utils/ValidationSchemas";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootSatckParamList>>();

  const handleLogin = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      ToastAndroid.showWithGravity(
        "User Logged In successfully!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      ToastAndroid.showWithGravity(
        "User not found!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={(values) => {
        console.log("values", values);
        handleLogin(values.email, values.password);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={values.email}
              style={[styles.input, styles.buttonOutline]}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}
            <TextInput
              placeholder="Password"
              value={values.password}
              style={[styles.input, styles.buttonOutline]}
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
              }}
              style={[
                styles.button,
                { backgroundColor: isValid ? "blue" : "grey" },
              ]}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterUser")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={{
              uri: "https://miro.medium.com/v2/resize:fit:850/1*YCyvDskoLsj9T-cRJfXh0g.png",
            }}
            style={{ flex: 1, width: "100%" }}
          ></ImageBackground>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
    marginTop: 40,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
