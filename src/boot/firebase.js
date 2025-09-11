import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUohNvgxf7oqp7LxA0SkzjB71TmzdOlXk",
  authDomain: "awesome-todo-cf5dc.firebaseapp.com",
  databaseURL: "https://awesome-todo-cf5dc-default-rtdb.firebaseio.com",
  projectId: "awesome-todo-cf5dc",
  storageBucket: "awesome-todo-cf5dc.firebasestorage.app",
  messagingSenderId: "1015544725411",
  appId: "1:1015544725411:web:26b2cb6337c0966128e416"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };

export { auth as firebaseAuth };