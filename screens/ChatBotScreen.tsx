import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootSatckParamList } from "../App";

type Props = NativeStackScreenProps<RootSatckParamList, "ChatBot">;

const ChatBotScreen: React.FC<Props> = ({ route }: Props) => {
  const [data, setData] = useState<any>([]);
  const [textInput, setTextInput] = useState("");

  const handleSend = async () => {
    const prompt = textInput;

    const config = new Configuration({
      apiKey: route.params.apikey,
    });
    const openai = new OpenAIApi(config);

    const completion = {
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
    };
    const response = await openai.createCompletion(completion);
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={[
                styles.field,
                styles.fieldoutline,
                {
                  fontWeight: "bold",
                  color: item.type === "user" ? "green" : "red",
                },
              ]}
            >
              {item.type === "user" ? "You : " : "Bot :"}
              <Text style={styles.bot}>{item.text}</Text>
            </Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="  Ask me anything"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcc9",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  body: {
    backgroundColor: "#fffcc9",
    width: "100%",
    
  },
  bot: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "yellow",
    width: "90%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
  field: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  fieldoutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
});
