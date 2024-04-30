import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import RaumbelegungScreen from "./screens/raumbelegung";
import StundenplanLehrerScreen from "./screens/stundenplanLehrer";
import StundenplanSuSScreen from "./screens/stundenplanSuS";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Raumbelegung" component={RaumbelegungScreen} />
        <Stack.Screen
          name="StundenplanLehrer"
          component={StundenplanLehrerScreen}
        />
        <Stack.Screen name="StundenplanSuS" component={StundenplanSuSScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
