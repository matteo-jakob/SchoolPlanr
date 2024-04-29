import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
  const [stundenplan, setStundenplan] = useState([]);
  const username = route.params.username;
  console.log("user initialized: " + route.params.username);

  useEffect(() => {
    // Get the stundenplan from firestore https://stackoverflow.com/questions/71214563/how-to-get-all-documents-in-a-collection-in-firestore
    const unsubscribe = firestore
      .collection("stundenplan")
      .onSnapshot((snapshot) => {
        const stundenplanData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStundenplan(stundenplanData);
      });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Hello, {username}</Text>
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
