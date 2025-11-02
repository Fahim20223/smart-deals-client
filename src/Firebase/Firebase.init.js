// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKM72HVfoBUm698xlNtFlSX1TxwqjVZco",
  authDomain: "smart-deals-636d6.firebaseapp.com",
  projectId: "smart-deals-636d6",
  storageBucket: "smart-deals-636d6.firebasestorage.app",
  messagingSenderId: "497500575251",
  appId: "1:497500575251:web:f6d7ae3aa84608f5eed1e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
