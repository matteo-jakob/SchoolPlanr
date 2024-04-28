import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const StundenplanLehrer = () => {
  const [schedule, setSchedule] = useState([]);

  // Beispiel-Daten für den Stundenplan eines Lehrers
  const dummySchedule = [
    {
      day: "Montag",
      subject: "Mathematik",
      room: "Raum 1",
      time: "08:00 - 09:30",
    },
    {
      day: "Dienstag",
      subject: "Deutsch",
      room: "Raum 2",
      time: "09:45 - 11:15",
    },
    {
      day: "Mittwoch",
      subject: "Geschichte",
      room: "Raum 3",
      time: "11:30 - 13:00",
    },
  ];

  useEffect(() => {
    // Hier könntest du die Logik implementieren, um den Stundenplan des Lehrers aus der Datenbank abzurufen
    // Beispiel: setSchedule([...stundenplanDatenDesLehrersAusDerDatenbank]);
    setSchedule(dummySchedule); // Verwende Dummy-Daten für die Demonstration
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stundenplan für Lehrer</Text>
      {schedule.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>{item.day}</Text>
          <Text style={styles.itemText}>{item.subject}</Text>
          <Text style={styles.itemText}>{item.room}</Text>
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

export default StundenplanLehrer;
