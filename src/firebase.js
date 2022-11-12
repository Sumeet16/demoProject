import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTPfNjWHZRcw3TvwfbMHAdhTEZLTVpviQ",
  authDomain: "storagedemo-c3d2d.firebaseapp.com",
  databaseURL: "https://storagedemo-c3d2d-default-rtdb.firebaseio.com",
  projectId: "storagedemo-c3d2d",
  storageBucket: "storagedemo-c3d2d.appspot.com",
  messagingSenderId: "885128275945",
  appId: "1:885128275945:web:dbb4b15829dd3b84d50d78"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);