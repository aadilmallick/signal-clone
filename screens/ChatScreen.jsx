import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import {
  doc,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { db } from "../firebase.config";

export default function ChatScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, chatName } = route.params;
  const [message, setMessage] = useState("");
  const { theUser } = useAuthStatus();
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: chatName,
    });
  }, []);

  useLayoutEffect(() => {
    setLoading(true);
    const chatRef = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(chatRef, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatMessages(messages);
      setLoading(false);
    });

    return unsub;
  }, []);

  const onSendChat = async () => {
    Keyboard.dismiss();
    const chatRef = collection(db, "chats", id, "messages");
    await addDoc(chatRef, {
      timestamp: serverTimestamp(),
      message,
      displayName: theUser.displayName,
      email: theUser.email,
      photoURL: theUser.photoURL,
    });

    setMessage("");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30,
            paddingTop: 10,
            paddingHorizontal: 5,
          }}
        >
          {chatMessages.map((chatUserData) => {
            if (chatUserData.email === theUser.email) {
              return (
                <UserMessage key={chatUserData.id} chatData={chatUserData} />
              );
            } else {
              return (
                <OtherMessage key={chatUserData.id} chatData={chatUserData} />
              );
            }
          })}
        </ScrollView>
        <View>
          <Input
            placeholder="enter a message"
            multiline
            value={message}
            onChangeText={setMessage}
            rightIcon={
              <TouchableOpacity className="pl-4" onPress={onSendChat}>
                <Ionicons name="send" size={24} color="blue" />
              </TouchableOpacity>
            }
            inputContainerStyle={{
              borderWidth: 1,
              borderRadius: message.length > 45 ? 0 : 100,
              paddingHorizontal: 16,
              backgroundColor: "lightgray",
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function UserMessage({ chatData }) {
  return (
    <View className="bg-gray-200 self-end relative rounded-3xl p-4 my-4 max-w-xs">
      <View className="absolute right-0 -bottom-4 z-10">
        <Avatar source={{ uri: chatData.photoURL }} rounded />
      </View>
      <Text>{chatData.message}</Text>
    </View>
  );
}

function OtherMessage({ chatData }) {
  return (
    <View className="bg-gray-200 self-start relative rounded-3xl p-4 my-4 max-w-xs">
      <View className="absolute right-0 -bottom-4 z-10">
        <Avatar source={{ uri: chatData.photoURL }} rounded />
      </View>
      <Text>{chatData.message}</Text>
    </View>
  );
}
