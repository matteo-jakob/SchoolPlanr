// login.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { firebase } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = response.user;
      console.log("Login:", user);
      navigation.navigate("Home", { username: email, isTeacher });
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = response.user;
      console.log("Register:", user);
      navigation.navigate("Home", { username: email, isTeacher });
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const handleTeacherLogin = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = response.user;
      console.log("Login:", user);
      setIsTeacher(true);
      navigation.navigate("Home", { username: email, isTeacher });
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Sign In or Sign Up</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Button
          icon={
            <Icon
              name="sign-in"
              type="font-awesome"
              color="white"
              size={20}
              style={{ marginRight: 10 }}
            />
          }
          title="Login"
          onPress={handleLogin}
          buttonStyle={styles.button}
        />
        <Button
          icon={
            <Icon
              name="user-plus"
              type="font-awesome"
              color="white"
              size={20}
              style={{ marginRight: 10 }}
            />
          }
          title="Register"
          onPress={handleRegister}
          buttonStyle={styles.button}
        />
        <Button
          icon={
            <Icon
              name="sign-in"
              type="font-awesome"
              color="white"
              size={20}
              style={{ marginRight: 10 }}
            />
          }
          title="Teacher Login "
          onPress={handleTeacherLogin}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 110,
    height: 110,
    borderRadius: 110,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    padding: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textInput: {
    color: "#fafafa",
    backgroundColor: "#727272",
    padding: 16,
    marginBottom: 16,
  },
  view: {
    backgroundColor: "#373737",
    height: "100%",
    padding: 16,
  },
});

export default LoginScreen;
