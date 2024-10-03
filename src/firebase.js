import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If you are using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCdv_J6D2jfUdwCqydIhkwsdsVG5ot3kPE",
  authDomain: "web-app-b7f01.firebaseapp.com",
  databaseURL: "https://web-app-b7f01-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-app-b7f01",
  storageBucket: "web-app-b7f01.appspot.com",
  messagingSenderId: "877176817288",
  appId: "1:877176817288:web:009ac5b58f0a066736c13d"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const firestore = getFirestore(app);

export { auth, firestore };
