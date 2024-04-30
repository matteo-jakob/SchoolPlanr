import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { firebase, firestore } from "../firebase";

const StundenplanScreen = () => {
  const [schedule, setSchedule] = useState([]);
  const [filters, setFilters] = useState({
    fach: "",
    lehrer: "",
    klasse: "",
  });
  const [sortBy, setSortBy] = useState("zeit"); // Default sorting by time
  const [zeit, setZeit] = useState(""); // State for time input
  const [dauer, setDauer] = useState(""); // State for duration input

  useEffect(() => {
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

  const applyFilters = (item) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === "") return true; // Skip filtering if filter value is empty
      return item[key].toLowerCase().includes(filters[key].toLowerCase());
    });
  };

  const compareByTime = (a, b) => {
    return a.zeit - b.zeit;
  };

  const handleSortByChange = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const filteredSchedule = schedule.filter(applyFilters).sort(compareByTime);

  const addScheduleItem = (newItem) => {
    const isOverlap = schedule.some(
      (item) =>
        item.lehrer === newItem.lehrer &&
        ((item.zeit <= newItem.zeit && item.zeit + item.dauer > newItem.zeit) ||
          (newItem.zeit <= item.zeit &&
            newItem.zeit + newItem.dauer > item.zeit))
    );

    if (isOverlap) {
      Alert.alert(
        "Overlap Detected",
        "The schedule overlaps with an existing entry."
      );
    } else {
      firestore.collection("stundenplan").add(newItem);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stundenplan für Schüler</Text>
      <View style={styles.filterContainer}>
        <Text>Filtern nach:</Text>
        <TextInput
          style={styles.input}
          placeholder="Fach"
          onChangeText={(text) => handleFilterChange("fach", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lehrer"
          onChangeText={(text) => handleFilterChange("lehrer", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Klasse"
          onChangeText={(text) => handleFilterChange("klasse", text)}
        />
      </View>
      <View style={styles.sortContainer}>
        <Text>Sortieren nach Zeit:</Text>
        <Button
          title="Aufsteigend"
          onPress={() => handleSortByChange("zeit")}
        />
        <Button
          title="Absteigend"
          onPress={() => handleSortByChange("-zeit")}
        />
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scheduleContainer}>
          {filteredSchedule.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{item.fach}</Text>
              <Text style={styles.itemText}>{item.lehrer}</Text>
              <Text style={styles.itemText}>{item.raum}</Text>
              <Text style={styles.itemText}>{item.klasse}</Text>
              <Text style={styles.itemText}>{item.zeit}</Text>
              <Text style={styles.itemText}>{item.dauer}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.addEntryContainer}>
        <Text style={styles.addEntryHeader}>Neuer Stundenplaneintrag</Text>
        <TextInput
          style={styles.input}
          placeholder="Fach"
          onChangeText={(text) => handleFilterChange("fach", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Lehrer"
          onChangeText={(text) => handleFilterChange("lehrer", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Klasse"
          onChangeText={(text) => handleFilterChange("klasse", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Zeit"
          onChangeText={(text) => setZeit(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Dauer"
          onChangeText={(text) => setDauer(text)}
          keyboardType="numeric"
        />
        <Button
          title="Eintrag hinzufügen"
          onPress={() =>
            addScheduleItem({
              fach: filters.fach,
              lehrer: filters.lehrer,
              klasse: filters.klasse,
              raum: "Raum",
              zeit: parseInt(zeit), // Convert input to integer
              dauer: parseInt(dauer), // Convert input to integer
            })
          }
        />
      </View>
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
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scheduleContainer: {
    flex: 1,
    marginBottom: 20,
  },
  addEntryContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  addEntryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default StundenplanScreen;
