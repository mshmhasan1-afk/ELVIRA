// ------------------ 1️⃣ Firebase Import & Config ------------------
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase config (tumhara jo mila)
const firebaseConfig = {
  apiKey: "AIzaSyBCBblQ0_4HVmv-_-WFbE2xn8rHGAI-DrM",
  authDomain: "elvira-8a512.firebaseapp.com",
  projectId: "elvira-8a512",
  storageBucket: "elvira-8a512.appspot.com",
  messagingSenderId: "699500729069",
  appId: "1:699500729069:web:05b7fee369e039ae73f2e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ------------------ 2️⃣ Admin Login ------------------
const loginBtn = document.getElementById("login");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const panel = document.getElementById("panel");

loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (email !== "mshmhasan1@gmail.com") {
        alert("Unauthorized");
        auth.signOut();
        return;
      }
      panel.style.display = "block";
      document.querySelector(".admin-login").style.display = "none";
    })
    .catch(err => alert(err.message));
});

// ------------------ 3️⃣ Add Product ------------------
const addBtn = document.getElementById("add");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");

addBtn.addEventListener("click", async () => {
  const name = nameInput.value;
  const price = priceInput.value;
  const file = imageInput.files[0];

  if (!name || !price || !file) {
    alert("Please fill all fields");
    return;
  }

  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Add product to Firestore
    await addDoc(collection(db, "products"), {
      name: name,
      price: Number(price),
      image: url
    });

    alert("Product added successfully!");
    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";

  } catch (err) {
    console.error(err);
    alert("Error adding product");
  }
});




