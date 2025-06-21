// Firebase configuration and initialization
// This file sets up Firebase with your project credentials and exports authentication functions

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase project configuration
// These credentials connect your app to your specific Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyBeNlHvB7v_UTg3TnEckFiJUnIsXCDbHxw",
  authDomain: "jaldhaara-9b8dd.firebaseapp.com",
  projectId: "jaldhaara-9b8dd",
  storageBucket: "jaldhaara-9b8dd.firebasestorage.app",
  messagingSenderId: "48888171464",
  appId: "1:48888171464:web:1e347f74a5b338a76ccefd"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
// This will be used throughout the app for login/logout operations
export const auth = getAuth(app);

// Create Google Auth Provider for Google Sign-In
// This enables users to sign in with their Google account
export const googleProvider = new GoogleAuthProvider();

// Export the app instance in case it's needed elsewhere
export default app;
