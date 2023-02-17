import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "@rneui/themed";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 relative">
        <ImageBackground
          source={require("../assets/images/loginbackground.png")}
          className="w-full flex-[0.3]"
        ></ImageBackground>
        <View className="bg-white flex-1 m-4 p-4 border border-gray-400 relative bottom-20">
          <Tabs setShowLogin={setShowLogin} showLogin={showLogin} />
          {showLogin ? <LoginForm /> : <SignUpForm />}
        </View>
      </SafeAreaView>
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="py-4">
      <Input
        placeholder="email"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        leftIcon={{
          type: "font-awesome",
          name: "envelope-o",
        }}
        inputStyle={{
          paddingHorizontal: 8,
        }}
      />
      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={{
          type: "font-awesome",
          name: "eye-slash",
        }}
        inputStyle={{
          paddingHorizontal: 8,
        }}
        secureTextEntry
      />
      <Button title="Login" />
    </View>
  );
}

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <KeyboardAvoidingView className="py-4" behavior="height">
      <Input
        placeholder="email"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        leftIcon={{
          type: "font-awesome",
          name: "envelope-o",
        }}
        inputStyle={{
          paddingHorizontal: 8,
        }}
      />
      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        leftIcon={{
          type: "font-awesome",
          name: "eye-slash",
        }}
        inputStyle={{
          paddingHorizontal: 8,
        }}
        secureTextEntry
      />
      <Input
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        leftIcon={{
          type: "font-awesome",
          name: "eye-slash",
        }}
        inputStyle={{
          paddingHorizontal: 8,
        }}
        secureTextEntry
      />
      <Button title="Sign up" />
    </KeyboardAvoidingView>
  );
}

function Tabs({ setShowLogin, showLogin }) {
  const currentClass = "text-lg border-b border-b-blue-400 p-2";
  const nonCurrentClass = "text-lg p-2";
  return (
    <View className="flex-row">
      <TouchableOpacity onPress={() => setShowLogin(true)}>
        <Text className={showLogin ? currentClass : nonCurrentClass}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowLogin(false)}>
        <Text className={showLogin ? nonCurrentClass : currentClass}>
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
