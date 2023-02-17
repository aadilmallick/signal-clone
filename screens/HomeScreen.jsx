import { View, Text, Button } from "react-native";
import React from "react";
import { auth } from "../firebase.config";
import { useSignOut } from "../hooks/useSignOut";
export default function HomeScreen() {
  const { isLoading, logout } = useSignOut();
  return (
    <View>
      <Button title="idl" onPress={logout} />
    </View>
  );
}
