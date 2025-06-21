// Authentication helper functions
// This file contains all the functions needed for user authentication

import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth, googleProvider } from './config';

// Function to sign in user with email and password
// Takes email and password as parameters and returns a promise
export const signInWithEmail = async (email, password) => {
  try {
    // Firebase function to authenticate user with email/password
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in successfully:', result.user.email);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { success: false, error: error.message };
  }
};

// Function to sign in with Google account
// Opens Google sign-in popup and authenticates user
export const signInWithGoogle = async () => {
  try {
    // Firebase function to sign in with Google popup
    const result = await signInWithPopup(auth, googleProvider);
    console.log('User signed in with Google:', result.user.email);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
    return { success: false, error: error.message };
  }
};

// Function to sign out the current user
// Logs out the currently authenticated user
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { success: false, error: error.message };
  }
};