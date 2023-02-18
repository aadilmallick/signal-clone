import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";

export const useSignIn = (email, password) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  async function login() {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
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

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { login, isLoading, isError };
};
