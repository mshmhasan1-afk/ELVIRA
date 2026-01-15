// ------------------ 1️⃣ Firebase Setup ------------------
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

// Firebase config (tumhara project)
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

// ------------------ 2️⃣ Orders Display ------------------
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

// ------------------ 3️⃣ Gmail Script Email Notification ------------------
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

// ------------------ 4️⃣ Real-time Orders + Notifications ------------------
const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  const orders = [];
  snapshot.forEach(doc => orders.push(doc.data()));
  renderOrders(orders);

  // Alert & send email for new orders only
  snapshot.docChanges().forEach(change => {
    if(change.type === "added") {
      alert("New Order Received!");
      sendEmailNotification(change.doc.data());
    }
  });
});
