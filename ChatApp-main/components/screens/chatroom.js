import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { firebase, firestore, storage } from "../firebase";
import { Button, Icon } from "react-native-elements";

const ChatRoomScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  const { roomName, roomId, username } = route.params;
  console.log(
    "User " + username + " joined the room " + roomName + " with Id " + roomId
  );

  useEffect(() => {
    // Fetch the messages of the room from Firestore https://stackoverflow.com/questions/46745076/how-to-orderbyvalue-onsnapshot-using-firestore
    const unsubscribe = firestore
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    console.log("photoUri received: " + route.params.photoUri);
    const photoUri = route.params.photoUri;
    if (photoUri) {
      const uploadImageAndSendMessage = async () => {
        console.log("ImageURI before set:" + photoUri);
        setImageUri(photoUri);
      };
      uploadImageAndSendMessage();
    }
  }, [route.params.photoUri, roomId]);
  useEffect(() => {
    if (imageUri !== null) {
      handleSendMessage();
    }
  }, [imageUri, roomId, username]);

  const handleSendMessage = async () => {
    console.log("ImageURI in send: " + imageUri);
    if (message.trim() === "" && !imageUri) {
      return;
    }
    const messageType = imageUri ? "image" : "text";
    try {
      if (messageType === "image") {
        // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=de
        await firestore
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            type: messageType,
            imageUri: imageUri,
            sender: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      } else {
        await firestore
          .collection("rooms")
          .doc(roomId)
          .collection("messages")
          .add({
            type: messageType,
            text: message,
            sender: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      }
      setMessage("");
      setImageUri(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLeaveRoom = () => {
    navigation.goBack();
  };

  const handleQuitRoom = () => {
    const roomRef = firestore.collection("rooms").doc(roomId);
    roomRef
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(username),
      })
      .then(async () => {
        const roomSnapshot = await roomRef.get();
        const roomData = roomSnapshot.data();

        if (!roomData.members || roomData.members.length === 0) {
          await roomRef.delete();
        }
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error quitting room:", error);
      });
  };

  const handleOpenCamera = () => {
    navigation.navigate("Camera", {
      roomName: roomName,
      username: username,
      roomId: roomId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Room: {roomName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {item.type === "text" ? (
              <Text style={styles.textMessage}>
                {item.sender}: {item.text}
              </Text>
            ) : (
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        )}
      />
      <TextInput
        placeholder="Type a message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.textInput}
      />
      <Button
        title="Send"
        onPress={handleSendMessage}
        buttonStyle={styles.button}
      />
      <Button
        title="Take Picture"
        onPress={handleOpenCamera}
        buttonStyle={styles.button}
      />
      <Button
        title="Leave Room"
        onPress={handleLeaveRoom}
        buttonStyle={styles.button}
      />
      <Button
        title="Quit Room"
        onPress={handleQuitRoom}
        buttonStyle={styles.button}
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
  textMessage: {
    color: "gainsboro",
    padding: 5,
  },
});

export default ChatRoomScreen;
