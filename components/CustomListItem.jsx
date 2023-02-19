import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";

export default function CustomListItem({ id, chatName }) {
  const navigation = useNavigation();
  const [previewMessage, setPreviewMessage] = useState(null);

  // TODO: create "users in chat" function

  useLayoutEffect(() => {
    const chatRef = query(
      collection(db, "chats", id, "messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );

    const unsub = onSnapshot(chatRef, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPreviewMessage(messages[0]);
    });

    return unsub;
  }, []);
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("Chat", { id, chatName });
      }}
    >
      <Avatar
        rounded
        source={{
          uri: previewMessage
            ? previewMessage.photoURL
            : "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title className="font-bold text-lg">
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {previewMessage &&
            `${previewMessage.displayName}: ${previewMessage.message}`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
