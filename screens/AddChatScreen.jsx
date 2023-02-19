import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

export default function AddChatScreen() {
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // TODO: add chat to firestore
  const onCreateChat = async () => {
    if (!chat) {
      Toast.error("please add a chat name");
      return;
    }
    setLoading(true);
    const colRef = collection(db, "chats");
    await addDoc(colRef, {
      chat,
    });
    setLoading(false);
    navigation.goBack();
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 p-4">
      <ToastManager width={300} />
      <Input
        placeholder="enter a chat name"
        value={chat}
        onChangeText={setChat}
        leftIcon={<Ionicons name="chatbox" size={20} />}
      />
      <Button title={"add chat"} onPress={onCreateChat} />
    </SafeAreaView>
  );
}
