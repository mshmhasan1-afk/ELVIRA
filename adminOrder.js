// Firebase setup (compat)
const firebaseConfig = {
  apiKey: "AIzaSyBCBblQ0_4HVmv-_-WFbE2xn8rHGAI-DrM",
  authDomain: "elvira-8a512.firebaseapp.com",
  projectId: "elvira-8a512",
  storageBucket: "elvira-8a512.appspot.com",
  messagingSenderId: "699500729069",
  appId: "1:699500729069:web:05b7fee369e039ae73f2e4"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Orders display
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

// Gmail Script Notification
function sendEmailNotification(order){
  fetch("https://script.google.com/macros/s/AKfycbzoMYIAfoa88OEo83SWhpSUClsBmLC8tZZp-LgsHz8Hwww4UbYH-BO5m_qq9woiIOyh/exec", {
    method: "POST",
    body: JSON.stringify({
      name: order.name,
      price: order.price,
      image: order.image,
      timestamp: new Date(order.timestamp.seconds*1000).toLocaleString()
    })
  }).then(res => console.log("Email sent"))
    .catch(err => console.error(err));
}

// Real-time Orders
db.collection("orders").orderBy("timestamp","desc").onSnapshot(snapshot=>{
  const orders = [];
  snapshot.forEach(doc=>orders.push(doc.data()));
  renderOrders(orders);
  snapshot.docChanges().forEach(change=>{
    if(change.type==="added"){
      alert("New Order Received!");
      sendEmailNotification(change.doc.data());
    }
  });
});
