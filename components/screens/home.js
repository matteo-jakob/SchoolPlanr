import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Stundenplan erstellen"
        onPress={() => navigation.navigate("CreateStundenplan")}
      />
      <Button
        title="Raumbelegung anzeigen"
        onPress={() => navigation.navigate("Raumbelegung")}
      />
      <Button
        title="Stundenplan für Schüler anzeigen"
        onPress={() => navigation.navigate("StundenplanSuS")}
      />
      <Button
        title="Stundenplan für Lehrer anzeigen"
        onPress={() => navigation.navigate("StundenplanLehrer")}
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
