import { useNavigation } from "@react-navigation/core";
import React from "react";
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
import { signupValidationSchema } from "../components/utils/ValidationSchemas";
import { Formik } from "formik";

const RegisterUserScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootSatckParamList>>();

  const handleSignUp = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
            firstname,
            lastname,
          });
        ToastAndroid.showWithGravity(
          "User created successfully!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          "User already present!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", firstname: "", lastname: "" }}
      validationSchema={signupValidationSchema}
      onSubmit={(values) => {
        handleSignUp(
          values.email,
          values.password,
          values.firstname,
          values.lastname
        );
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
          <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/id/1346050917/vector/creating-new-account-with-login-and-secure-password-registration-user-interface-users.jpg?s=170667a&w=0&k=20&c=Kyb8VNmMQD6He6Hlqg50Jllw09-ZcVSrg2rjrqti1Fw=",
            }}
            style={{ flex: 1, width: "100%" }}
          ></ImageBackground>
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
            <TextInput
              placeholder="First Name"
              value={values.firstname}
              style={[styles.input, styles.buttonOutline]}
              onChangeText={handleChange("firstname")}
              onBlur={() => setFieldTouched("firstname")}
            />
            {touched.firstname && errors.firstname && (
              <Text>{errors.firstname}</Text>
            )}
            <TextInput
              placeholder="Last Name"
              value={values.lastname}
              style={[styles.input, styles.buttonOutline]}
              onChangeText={handleChange("lastname")}
              onBlur={() => setFieldTouched("lastname")}
            />
            {touched.lastname && errors.lastname && (
              <Text>{errors.lastname}</Text>
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
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={{ fontWeight: "bold" }}>
                Already have an account ? click here
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
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
    marginTop: 20,
    marginBottom: 20,
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
