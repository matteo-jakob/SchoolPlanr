import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const CreateStundenplan = () => {
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSubject = () => {
    // Hier könntest du die Logik zum Hinzufügen eines Faches zum Stundenplan implementieren
    // Zum Beispiel könntest du eine Verbindung zur Firestore-Datenbank herstellen und die Daten speichern
    console.log(
      "Fach hinzufügen:",
      subjectName,
      teacherName,
      roomName,
      startTime,
      endTime
    );
    // Hier könntest du die Eingabefelder zurücksetzen
    setSubjectName("");
    setTeacherName("");
    setRoomName("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Fachname"
        value={subjectName}
        onChangeText={setSubjectName}
      />
      <TextInput
        style={styles.input}
        placeholder="Lehrername"
        value={teacherName}
        onChangeText={setTeacherName}
      />
      <TextInput
        style={styles.input}
        placeholder="Raumname"
        value={roomName}
        onChangeText={setRoomName}
      />
      <TextInput
        style={styles.input}
        placeholder="Startzeit"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Endzeit"
        value={endTime}
        onChangeText={setEndTime}
      />
      <Button title="Fach hinzufügen" onPress={handleAddSubject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default CreateStundenplan;
