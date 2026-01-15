// ------------------ 1️⃣ Firebase Config ------------------
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);

// ------------------ 2️⃣ Products Display ------------------
const productsEl = document.getElementById("products");

async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    productsEl.innerHTML = ""; // Clear existing products

    querySnapshot.forEach(doc => {
      const p = doc.data();
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
        <button>Add to Cart</button>
      `;
      productsEl.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    productsEl.innerHTML = "<p>Failed to load products.</p>";
  }
}

// ------------------ 3️⃣ Initial Fetch ------------------
fetchProducts();

// Optional: If you want real-time updates (products show immediately when added), we can upgrade to onSnapshot later



