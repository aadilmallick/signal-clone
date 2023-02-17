import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import { useAuthStatus } from "../hooks/useAuthStatus";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator();

const globalScreenStyles = {
  headerStyle: {
    backgroundColor: "blue",
  },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function AuthStack() {
  const { loading, loggedIn, theUser } = useAuthStatus();
  const AuthenticatedScreens = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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

  if (loading) {
    return null;
  }

  return loggedIn ? <AuthenticatedScreens /> : <UnauthenticatedScreens />;
}
