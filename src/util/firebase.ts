// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDUpc35g81YjBe3h2fbPNYpfUOTdGkBe-4",
    authDomain: "unipipe-428de.firebaseapp.com",
    projectId: "unipipe-428de",
    storageBucket: "unipipe-428de.appspot.com",
    messagingSenderId: "842882119368",
    appId: "1:842882119368:web:cc47244839c6ad9b1c57fd",
    measurementId: "G-B0P3NGKSW2",
    databaseURL: "https://unipipe-428de-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseApp = app;
export const database = getDatabase(app);
