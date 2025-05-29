
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Fetched from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Log the configuration to help with debugging
console.log("Attempting to initialize Firebase with the following config:");
console.log("API Key:", firebaseConfig.apiKey ? "Exists" : "MISSING or undefined");
console.log("Auth Domain:", firebaseConfig.authDomain ? "Exists" : "MISSING or undefined");
console.log("Project ID:", firebaseConfig.projectId ? "Exists" : "MISSING or undefined");
// You can add more logs here for other config values if needed.
// For security, avoid logging the actual key values in a production environment,
// but for local debugging, seeing if it's undefined is key.
// console.log("Actual API Key (for local debugging only, remove for prod):", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);


// Validate that all Firebase config values are present
const missingKeys = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  const errorMessage = `Firebase configuration is incomplete. The following keys are missing or undefined: ${missingKeys.join(", ")}. Please check your environment variables (.env file) and ensure the Next.js development server was restarted after changes.`;
  console.error("Critical Firebase Configuration Error:", errorMessage);
  // In a real app, you might want to throw an error or handle this more gracefully
  // For now, this will make the issue very clear in the logs.
  // throw new Error(errorMessage); // Uncomment to make it a hard stop
}


// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

export { app, auth };
