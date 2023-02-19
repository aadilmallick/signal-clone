import { View, Text, Button, SafeAreaView } from "react-native";
import React from "react";
import { auth } from "../firebase.config";
import { useSignOut } from "../hooks/useSignOut";
import ToastManager from "toastify-react-native";
export default function HomeScreen() {
  const { isLoading, logout } = useSignOut();
  return (
    <SafeAreaView>
      <ToastManager />
      <Button title="idl" onPress={logout} />
    </SafeAreaView>
  );
}
