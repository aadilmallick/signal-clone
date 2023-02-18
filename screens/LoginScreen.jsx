import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Toast } from "toastify-react-native";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button } from "@rneui/themed";
import useGoogleLogin from "../hooks/useGoogleLogin";
import { useSignUp } from "../hooks/useSignUp";
import * as ImagePicker from "expo-image-picker";
import { useUpload } from "../hooks/useFileUpload";
import { useAuthStatus } from "../hooks/useAuthStatus";
import ToastManager from "toastify-react-native";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 relative">
        <ToastManager position="top" positionValue={20} />
        <ImageBackground
          source={require("../assets/images/loginbackground.png")}
          className="w-full flex-[0.3]"
        ></ImageBackground>
        <View className="bg-white flex-[0.7] m-4 p-4 border border-gray-400 -mt-32">
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
    <View className="py-4 flex-1">
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
      <GoogleButton />
    </View>
  );
}

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(
    "https://www.amongusavatarcreator.com/assets/img/main/icon.png"
  );
  const { signup, isLoading } = useSignUp(email, password);

  async function onSubmit() {
    if (
      !email ||
      !password ||
      password.length < 7 ||
      password !== confirmPassword ||
      !photoURL
    ) {
      console.log("invalid credentials");
      Toast.error("Invalid credentials");
      return;
    }

    console.log(email, password, photoURL);
  }
  return (
    <KeyboardAvoidingView className="py-4" behavior="height">
      <ToastManager />
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
      <ProfilePicButton setUrl={setPhotoURL} />
      <Button title="Sign up" onPress={onSubmit} />
      <GoogleButton />
    </KeyboardAvoidingView>
  );
}

function GoogleButton() {
  const { loading, login } = useGoogleLogin();

  return (
    <View>
      <Text className="text-center p-1 text-gray-500">or</Text>
      <TouchableOpacity
        className="bg-blue-300 p-2"
        onPress={login}
        disabled={loading}
      >
        <Text className="text-center">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
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

function ProfilePicButton({ setUrl }) {
  const [image, setImage] = useState(null);
  const { uploadImageBlob, isLoading } = useUpload("profiles");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("uri got:", uri);
      setImage(uri);
      const imageURL = await uploadImageBlob(uri);
      setUrl(imageURL);
    }
  };

  if (isLoading) {
    return (
      <View className="p-2 items-center justify-center">
        <ActivityIndicator size={40} />
      </View>
    );
  }

  return (
    <View className="mb-8">
      <Button title="pick an image" onPress={pickImage} />
      <View className="mt-2 -mb-4">
        {image ? (
          <Image
            className="h-12 w-12 rounded-full self-center"
            source={{ uri: image }}
          />
        ) : (
          <Text className="text-2xl text-gray-400 text-center">
            Image preview here
          </Text>
        )}
      </View>
    </View>
  );
}
