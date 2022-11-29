import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoKmeyLCWdjWgu5gXLFJjyLi1JsveYanQ",
  authDomain: "psuwalktober.firebaseapp.com",
  databaseURL: "https://psuwalktober-default-rtdb.firebaseio.com/",
  projectId: "psuwalktober",
  storageBucket: "psuwalktober.appspot.com",
  messagingSenderId: "949612719811",
  appId: "1:949612719811:web:1c3329349a6538e6197c76",
  measurementId: "G-Q4NLD3BN06"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);