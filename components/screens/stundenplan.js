import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

const StundenplanScreen = () => {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    // Get the stundenplan from firestore https://stackoverflow.com/questions/71214563/how-to-get-all-documents-in-a-collection-in-firestore
    const unsubscribe = firestore
      .collection("stundenplan")
      .onSnapshot((snapshot) => {
        const stundenplanData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedule(stundenplanData);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stundenplan für Schüler</Text>
      {schedule.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item.fach}</Text>
          <Text style={styles.itemText}>{item.lehrer}</Text>
          <Text style={styles.itemText}>{item.raum}</Text>
          <Text style={styles.itemText}>{item.klasse}</Text>
          <Text style={styles.itemText}>{item.zeit}</Text>
          <Text style={styles.itemText}>{item.dauer}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default StundenplanScreen;
