import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

const globalScreenStyles = {
  headerStyle: {
    backgroundColor: "blue",
  },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function AuthStack() {
  const AuthenticatedScreens = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" />
      </Stack.Navigator>
    );
  };

  const UnauthenticatedScreens = () => {
    return (
      <Stack.Navigator screenOptions={globalScreenStyles}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  };
  return <UnauthenticatedScreens />;
}
