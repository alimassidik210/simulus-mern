// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FRIEBASE_API_KEY,
  authDomain: "simulus-fa4e9.firebaseapp.com",
  projectId: "simulus-fa4e9",
  storageBucket: "simulus-fa4e9.appspot.com",
  messagingSenderId: "1040415418837",
  appId: "1:1040415418837:web:92543c156389cf9bb1755c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
