import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setTheUser(user);
      } else {
        setLoggedIn(false);
        setTheUser(null);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  return { loggedIn, loading, theUser };
};
