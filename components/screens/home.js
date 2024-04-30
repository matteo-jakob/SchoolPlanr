import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const Home = ({ navigation, route }) => {
  console.log("params: ", route.params);
  const username = route.params.username;
  console.log("user initialized: " + route.params.username);

  return (
    <View style={styles.container}>
      <Text>Hello, {username}</Text>
      <Button
        title="Stundenplan anzeigen"
        onPress={() => navigation.navigate("Stundenplan")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
