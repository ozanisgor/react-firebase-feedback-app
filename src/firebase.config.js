// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIWueQsnaAbcwbbguVWIAVmgw4oQuCuFk',
  authDomain: 'feedback-app-react.firebaseapp.com',
  projectId: 'feedback-app-react',
  storageBucket: 'feedback-app-react.appspot.com',
  messagingSenderId: '360735585272',
  appId: '1:360735585272:web:cc7aebf36bd792f51b9c0d',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
