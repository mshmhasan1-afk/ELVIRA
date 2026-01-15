const loginBtn = document.getElementById("login-btn");
const panel = document.getElementById("panel");
const loginSection = document.getElementById("login-section");

loginBtn.addEventListener("click", ()=>{
  const email = document.getElementById("admin-email").value;
  const pass = document.getElementById("admin-pass").value;

  // Simple check (hardcoded admin email)
  if(email==="mshmhasan1@gmail.com" && pass==="123456"){ 
    loginSection.style.display="none";
    panel.style.display="block";
  }else{
    alert("Invalid admin credentials");
  }
});

// Product Add
document.getElementById("add").addEventListener("click", ()=>{
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageInput = document.getElementById("image");

  if(!name || !price || !imageInput.files.length){ alert("Fill all fields"); return;}

  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e){
    db.collection("products").add({
      name, price, image:e.target.result, timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{ alert("Product Added"); });
  }
  reader.readAsDataURL(file);
});



