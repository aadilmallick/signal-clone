// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQvd-rO61lAj-8WCCPcfXztFxyK4TONRw",
  authDomain: "signal-clone-378118.firebaseapp.com",
  projectId: "signal-clone-378118",
  storageBucket: "signal-clone-378118.appspot.com",
  messagingSenderId: "598883802669",
  appId: "1:598883802669:web:d9ee6111e8f70c1bea62a4",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
export { auth, db, storage };
