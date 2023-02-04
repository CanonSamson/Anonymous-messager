import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage"
// import FIREBASE_API_KEY  from "./.env"

const firebaseConfig = {
    apiKey: "AIzaSyDjR-dXmSPGAoepyaUbRo7TqxGSke3BAs4",
    authDomain: "anonymous-message-ac18a.firebaseapp.com",
    projectId: "anonymous-message-ac18a",
    storageBucket: "anonymous-message-ac18a.appspot.com",
    messagingSenderId: "297702545540",
    appId: "1:297702545540:web:b427a0eaf42d820816cad1",
    measurementId: "G-L48MYJ6H8H"
  };
  

const app = initializeApp(firebaseConfig);



export const db = getFirestore(app)
export const storage = getStorage(app)
