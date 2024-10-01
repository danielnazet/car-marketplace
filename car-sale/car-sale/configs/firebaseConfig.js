// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "car-marketplace-8a00c.firebaseapp.com",
	projectId: "car-marketplace-8a00c",
	storageBucket: "car-marketplace-8a00c.appspot.com",
	messagingSenderId: "508650050081",
	appId: "1:508650050081:web:0012263338013e72860960",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
