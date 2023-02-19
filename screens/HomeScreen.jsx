import {
  View,
  Text,
  Button,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { useSignOut } from "../hooks/useSignOut";
import ToastManager from "toastify-react-native";
import { ScrollView } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
export default function HomeScreen() {
  const { isLoading, logout } = useSignOut();
  const [loading, setLoading] = useState(false);
  const { theUser } = useAuthStatus();
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  function signOut() {
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Ask me later pressed"),
          style: "cancel",
        },
        {
          text: "Sign out",
          onPress: logout,
        },
      ],
      { cancelable: true }
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerLeft: () => {
        return (
          <View className="ml-4">
            <TouchableOpacity onPress={signOut}>
              <Avatar rounded source={{ uri: theUser?.photoURL }} />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View className="mr-4">
            <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
              <Ionicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitleAlign: "center",
    });
  }, [theUser]);

  useEffect(() => {
    const colRef = collection(db, "chats");
    const unsub = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setChats(data);
    });

    return unsub;
  }, []);

  if (isLoading || loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ToastManager />
      <ScrollView className="flex-1 mb-16">
        {chats.map((chat) => (
          <CustomListItem chatName={chat.chat} key={chat.id} id={chat.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
