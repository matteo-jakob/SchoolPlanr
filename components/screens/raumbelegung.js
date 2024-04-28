import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Raumbelegung = () => {
  const [roomOccupancy, setRoomOccupancy] = useState([]);

  // Beispiel-Daten für die Raumbelegung
  const dummyRoomOccupancy = [
    {
      room: "Raum 1",
      occupancy: "Klasse A - Mathematik",
      time: "08:00 - 09:30",
    },
    { room: "Raum 2", occupancy: "Klasse B - Deutsch", time: "09:45 - 11:15" },
    {
      room: "Raum 3",
      occupancy: "Klasse C - Geschichte",
      time: "11:30 - 13:00",
    },
  ];

  useEffect(() => {
    // Hier könntest du die Logik implementieren, um die Raumbelegung aus der Datenbank abzurufen
    // Beispiel: setRoomOccupancy([...raumBelegungsDatenAusDerDatenbank]);
    setRoomOccupancy(dummyRoomOccupancy); // Verwende Dummy-Daten für die Demonstration
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Raumbelegung</Text>
      {roomOccupancy.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item.room}</Text>
          <Text style={styles.itemText}>{item.occupancy}</Text>
          <Text style={styles.itemText}>{item.time}</Text>
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

export default Raumbelegung;
