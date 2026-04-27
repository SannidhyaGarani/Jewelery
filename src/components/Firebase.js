// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAybtHfdNr1wmq9Wv-EYRrTByU1UW9qdrs",
  authDomain: "jewellery-ba356.firebaseapp.com",
  projectId: "jewellery-ba356",
  storageBucket: "jewellery-ba356.firebasestorage.app",
  messagingSenderId: "494131954877",
  appId: "1:494131954877:web:2075c76b028fc34e02e3d4",
  measurementId: "G-YLMFGV407L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
