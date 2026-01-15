1 of 188
assets
Inbox

Moonlit Soul
7:32 PM (2 hours ago)
assets/├── logo.png├── bag1.jpg├── bag2.jpg└── bag3.jpg
8

mshm hasan
9:29 PM (5 minutes ago)
https://script.google.com/macros/s/AKfycbzoMYIAfoa88OEo83SWhpSUClsBmLC8tZZp-LgsHz8Hwww4UbYH-BO5m_qq9woiIOyh/exec

Moonlit Soul
9:35 PM (0 minutes ago)
to me

// ------------------ 1️⃣ Firebase Setup ------------------
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

// Firebase config (tumhara config)
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
  ordersEl.innerHTML = "";
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

// ------------------ 3️⃣ Email Notification via Gmail Script ------------------
function sendEmailNotification(order){
  fetch("https://script.google.com/macros/s/AKfycbzoMYIAfoa88OEo83SWhpSUClsBmLC8tZZp-LgsHz8Hwww4UbYH-BO5m_qq9woiIOyh/exec", {
    method: "POST",
    body: JSON.stringify({
      name: order.name,
      price: order.price,
      image: order.image,
      timestamp: new Date(order.timestamp.seconds*1000).toLocaleString()
    })
  }).then(res => console.log("Email sent via Gmail Script"))
    .catch(err => console.error(err));
}

// ------------------ 4️⃣ Real-time Orders + Notification ------------------
const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  const orders = [];
  snapshot.forEach(doc => orders.push(doc.data()));
  renderOrders(orders);

  // Alert & Email for new orders
  snapshot.docChanges().forEach(change => {
    if(change.type === "added") {
      alert("New Order Received!");
      sendEmailNotification(change.doc.data());
    }
  });
});
