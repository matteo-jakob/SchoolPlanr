// camera.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import { Button, Icon } from "react-native-elements";

const CameraScreen = ({ navigation, route }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Request camera permissions https://docs.expo.dev/versions/latest/sdk/camera/
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri);
        if (photo && photo.uri) {
          navigation.navigate("ChatRoom", {
            photoUri: photo.uri,
            roomName: route.params.roomName,
            username: route.params.username,
            isFromCamera: true,
            roomId: route.params.roomId,
          });
          console.log("roomname: " + route.params.roomName);
          console.log("username: " + route.params.username);
          console.log("roomid: " + route.params.roomId);
        } else {
          console.error("Error capturing photo or URI is undefined");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  return (
    <View>
      {cameraPermission === null ? (
        <View />
      ) : cameraPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ height: "100%", backgroundColor: "#373737" }}>
          <Camera
            style={{ height: "50%", margin: 20, height: "50%" }}
            ref={cameraRef}
          ></Camera>
          <Button
            buttonStyle={{
              borderRadius: 150,
              elevation: 3,
              backgroundColor: "black",
              marginTop: 10,
              width: 150,
              height: 150,
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
            }}
            title="Take Picture"
            icon={
              <Icon
                name="camera"
                type="font-awesome"
                color="white"
                size={20}
                style={{ margin: 10 }}
              />
            }
            onPress={handleTakePicture}
          />
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
