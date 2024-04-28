// home.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { firebase, firestore } from "../firebase";
import { Button, Icon } from "react-native-elements";

const HomeScreen = ({ navigation, route }) => {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  const username = route.params.username;
  console.log("user initialized: " + route.params.username);

  useEffect(() => {
    // Get the roomlist from firestore https://stackoverflow.com/questions/71214563/how-to-get-all-documents-in-a-collection-in-firestore
    const unsubscribe = firestore.collection("rooms").onSnapshot((snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateRoom = async () => {
    // Create a new room in Firestore
    await firestore.collection("rooms").add({
      name: roomName,
      members: [username],
    });
    setRoomName("");
  };

  const handleJoinRoom = (roomId) => {
    // Update the members of the room in Firestore https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
    firestore
      .collection("rooms")
      .doc(roomId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(username),
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {username}!</Text>
      <TextInput
        placeholder="Enter room name"
        value={roomName}
        onChangeText={(text) => setRoomName(text)}
        style={styles.textInput}
      />
      <Button
        icon={
          <Icon
            name="plus"
            type="font-awesome"
            color="white"
            size={20}
            style={{ marginRight: 10 }}
          />
        }
        title="Create Room"
        onPress={handleCreateRoom}
        buttonStyle={styles.button}
      />
      <Text style={styles.heading}>Available Rooms:</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>
              {item.name} ({item.members.length})
            </Text>
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
              title="Join Room"
              onPress={() => handleJoinRoom(item.id)}
              buttonStyle={styles.button}
            />
            <Button
              icon={
                <Icon
                  name="comments"
                  type="font-awesome"
                  color="white"
                  size={20}
                  style={{ marginRight: 10 }}
                />
              }
              title="Go to Chat"
              onPress={() =>
                navigation.navigate("ChatRoom", {
                  roomName: item.name,
                  roomId: item.id,
                  username: username,
                })
              }
              buttonStyle={styles.button}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#373737",
    height: "100%",
  },
  button: {
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 10,
  },
  textInput: {
    color: "#fafafa",
    backgroundColor: "#727272",
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "gainsboro",
  },
  text: {
    color: "gainsboro",
    padding: 25,
  },
});

export default HomeScreen;
