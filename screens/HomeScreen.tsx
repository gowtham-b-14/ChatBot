import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config";
import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootSatckParamList } from "../App";

type Props = NativeStackScreenProps<RootSatckParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [name, setName] = useState<any>("");
  const [key, setKey] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);
  return (
    <>
      <ImageBackground
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6676/6676583.png",
        }}
        style={{ flex: 1, width: "100%" }}
      ></ImageBackground>

      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.nametext}>
          Welcome, {name.firstname} {name.lastname}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Your openai API Key"
            value={key}
            onChangeText={(text) => setKey(text)}
            style={[styles.input, styles.buttonOutline]}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("ChatBot", { apikey: key });
              }}
            >
              <Text style={styles.buttonText}>send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => {
                firebase.auth().signOut();
              }}
            >
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  inputContainer: {
    width: "80%",
    alignItems:"center"
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  nametext: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
