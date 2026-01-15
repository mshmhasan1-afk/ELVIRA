// ------------------ 1️⃣ Firebase Setup ------------------
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

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

// ------------------ 2️⃣ Orders View ------------------
const ordersEl = document.getElementById("orders");

function renderOrders(orders) {
  ordersEl.innerHTML = ""; // Clear existing
  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";
    div.innerHTML = `
      <img src="${order.image}" width="60">
      <strong>${order.name}</strong>
      <span>Rs ${order.price}</span>
      <span>${new Date(order.timestamp.seconds*1000).toLocaleString()}</span>
    `;
    ordersEl.appendChild(div);
  });
}

// Real-time updates
const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  const orders = [];
  snapshot.forEach(doc => orders.push(doc.data()));
  renderOrders(orders);

  // Optional: browser alert for new orders
  if(snapshot.docChanges().some(change => change.type === "added")) {
    alert("New Order Received!");
  }
});



