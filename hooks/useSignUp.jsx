import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useSignUp = (email, password, username) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  async function signup() {
    try {
      setIsLoading(true);
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: username });
      if (!isCancelled) {
        setIsLoading(false);
      }
      return user;
    } catch (e) {
      console.log(e);
      if (!isCancelled) {
        setIsError(e.message);
        setIsLoading(false);
      }
    }
  }

  async function updateUserProfile(displayName, photoURL) {
    const config = {};
    displayName && (config.displayName = displayName);
    photoURL && (config.photoURL = photoURL);
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        throw Error("Not authorized. User is null.");
      }
      await updateProfile(auth.currentUser, { ...config });
    } catch (e) {
      console.log(e);
      setIsError(e.message);
    }
  }

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { signup, isLoading, isError, updateUserProfile };
};
