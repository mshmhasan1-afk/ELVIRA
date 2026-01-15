const logo = document.getElementById("logo");
let clicks=0, timer=null;

logo.addEventListener("click", () => {
  clicks++;
  if(!timer){
    timer=setTimeout(()=>{ clicks=0; timer=null; }, 3000);
  }
  if(clicks===5){ window.location.href="admin.html"; }
});

const productsEl=document.getElementById("products");
const products=[
  {name:"ELVIRA Classic Tote", price:8500, image:"assets/bag1.jpg"},
  {name:"ELVIRA Mini Shoulder", price:6200, image:"assets/bag2.jpg"},
  {name:"ELVIRA Luxury Clutch", price:4300, image:"assets/bag3.jpg"}
];

function renderProducts(){
  productsEl.innerHTML="";
  products.forEach(p=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Rs ${p.price}</p>
      <button>Add to Cart</button>
    `;
    productsEl.appendChild(div);
  });
}

renderProducts();
