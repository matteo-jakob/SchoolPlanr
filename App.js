import "./components/firebase";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./components/navigation";

export default function App() {
  console.log("App Initializing...");
  return <AppNavigator />;
}
