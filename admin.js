// Firebase CDN config
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "elvira-a8512.firebaseapp.com",
  projectId: "elvira-a8512",
  storageBucket: "elvira-a8512.appspot.com",
  messagingSenderId: "695508720869",
  appId: "1:695508720869:web:..."
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Admin Login
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login-panel").style.display = "none";
      document.getElementById("admin-panel").style.display = "block";
    })
    .catch((error) => {
      alert(error.message);
    });
});

