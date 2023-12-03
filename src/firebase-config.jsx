// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoBOBJ0Pv-oZvMbaL98eyEtRJTwrloftg",
    authDomain: "schoolmanagement-298df.firebaseapp.com",
    projectId: "schoolmanagement-298df",
    storageBucket: "schoolmanagement-298df.appspot.com",
    messagingSenderId: "276045820886",
    appId: "1:276045820886:web:7f71dff9c1b0c726a9aa77",
    measurementId: "G-K0CWWLDFSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)

export const auth = getAuth(app);
