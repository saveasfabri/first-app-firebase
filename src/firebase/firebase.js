// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from '@firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZysi982Sgo3KnwQFOcyptGCBjRS91lHY",
  authDomain: "fir-sf-da080.firebaseapp.com",
  projectId: "fir-sf-da080",
  storageBucket: "fir-sf-da080.appspot.com",
  messagingSenderId: "879620672833",
  appId: "1:879620672833:web:11dd33ab6b05a7be4ae5c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);