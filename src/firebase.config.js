// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEsN7VFFEjhO_r123I7ev2wXB9SjbKa_k",
  authDomain: "feedback-2nd.firebaseapp.com",
  projectId: "feedback-2nd",
  storageBucket: "feedback-2nd.appspot.com",
  messagingSenderId: "744312816695",
  appId: "1:744312816695:web:4d91a3ce29217a0cee6bb2",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
