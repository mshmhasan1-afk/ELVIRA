// ------------------ 1️⃣ Firebase Setup ------------------
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCBblQ0_4HVmv-_-WFbE2xn8rHGAI-DrM",
  authDomain: "elvira-8a512.firebaseapp.com",
  projectId: "elvira-8a512",
  storageBucket: "elvira-8a512.appspot.com",
  messagingSenderId: "699500729069",
  appId: "1:699500729069:web:05b7fee369e039ae73f2e4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------ 2️⃣ Add to Cart Logic ------------------
const productsEl = document.getElementById("products");

productsEl.addEventListener("click", async (e) => {
  if(e.target.tagName === "BUTTON" && e.target.innerText === "Add to Cart") {
    const card = e.target.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = card.querySelector("p").innerText.replace("Rs ", "");
    const image = card.querySelector("img").src;

    // ------------------ 3️⃣ Add to Firestore Orders ------------------
    try {
      await addDoc(collection(db, "orders"), {
        name: name,
        price: Number(price),
        image: image,
        timestamp: new Date()
      });

      alert(`Order placed for "${name}"!`);
      
      // Optional: reset or update cart visually
      e.target.innerText = "Added ✔";
      e.target.disabled = true;

    } catch(err) {
      console.error(err);
      alert("Error placing order!");
    }
  }
});



