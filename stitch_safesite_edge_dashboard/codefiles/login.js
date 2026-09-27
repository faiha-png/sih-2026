// login.js — ThermIQ Step 5: sign in, look up role in Firestore, redirect.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Your web app's Firebase configuration (shared project)
const firebaseConfig = {
  apiKey: "AIzaSyCh2OcaH4R-jo9rlIuhyJg15Tv0SQIwW2E",
  authDomain: "thermiq-a4dbf.firebaseapp.com",
  databaseURL: "https://thermiq-a4dbf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thermiq-a4dbf",
  storageBucket: "thermiq-a4dbf.firebasestorage.app",
  messagingSenderId: "958851810675",
  appId: "1:958851810675:web:0d3c9383df7395629a7106"
};

// Initialize Firebase (only once — login.html no longer initializes it separately)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Role -> destination page mapping
const ROLE_REDIRECTS = {
  worker: "workerdashboard.html",
  supervisor: "index.html"
};

const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorEl = document.getElementById("login-error");
const loginBtn = document.getElementById("loginBtn");
const loginBtnText = document.getElementById("loginBtnText");

form.addEventListener("submit", handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  const email = usernameInput.value.trim();
  const password = passwordInput.value;

  setError("");
  setLoading(true);

  try {
    // 1. Sign in using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // 2. Get the logged-in user's UID
    const uid = userCredential.user.uid;

    // 3. Find users/{UID} in Firestore
    const userDoc = await getDoc(doc(db, "users", uid));

    // 4. Make sure the profile document exists
    if (!userDoc.exists()) {
      setError("User profile not found in Firestore.");
      setLoading(false);
      return;
    }

    // 5. Read the user's role
    const userData = userDoc.data();
    const destination = ROLE_REDIRECTS[userData.role];

    // 6. Redirect based on role
    if (destination) {
      window.location.href = destination;
    } else {
      setError("Invalid user role.");
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setError(friendlyAuthError(err));
    setLoading(false);
  }
}

function setError(message) {
  errorEl.textContent = message;
}

function setLoading(isLoading) {
  loginBtn.disabled = isLoading;
  loginBtnText.textContent = isLoading ? "Signing in..." : "SIGN IN";
}

// Turn common Firebase Auth error codes into readable messages
function friendlyAuthError(err) {
  switch (err.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Login failed: " + err.message;
  }
}