import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet} from "react-native";
import { firebase } from "./config";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import "react-native-url-polyfill/auto";
import RegisterUserScreen from "./screens/RegisterUserScreen";
import ChatBotScreen from "./screens/ChatBotScreen";

export type RootSatckParamList={
  Login:undefined;
  Home:undefined;
  RegisterUser:undefined;
  ChatBot:{apikey:string}
}

const Stack = createNativeStackNavigator<RootSatckParamList>();

function App() {
  const [initalizing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initalizing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initalizing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChatBot" component={ChatBotScreen}/>
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
