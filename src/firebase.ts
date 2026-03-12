// Firebase Configuration - Video Universe App
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLcIk767wC21cI8D-3KuHfdc3iwMPs9GY",
  authDomain: "universe-app-ad133.firebaseapp.com",
  projectId: "universe-app-ad133",
  storageBucket: "universe-app-ad133.firebasestorage.app",
  messagingSenderId: "129502533270",
  appId: "1:129502533270:web:bd410854d4932282bed4b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
