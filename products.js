// ========== PRODUCTS DATA ==========
const products = [
  { name: "Elvira Classic", price: 8500, img: "assets/bag1.jpg" },
  { name: "Elvira Gold", price: 9200, img: "assets/bag2.jpg" },
  { name: "Elvira Noir", price: 10000, img: "assets/bag3.jpg" }
];

// ========== PRODUCT SECTION ==========
const productsContainer = document.querySelector(".products");
productsContainer.innerHTML = "";

products.forEach((product, index) => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Rs. ${product.price}</p>
    <button data-index="${index}">Add to Cart</button>
  `;
  productsContainer.appendChild(div);
});

// ========== ADD TO CART ==========
let cart = [];
productsContainer.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON"){
    const index = e.target.getAttribute("data-index");
    cart.push(products[index]);
    alert(`${products[index].name} added to cart!`);
    console.log("Cart:", cart);
  }
});

// ========== HIDDEN ADMIN TRIGGER (5 CLICKS) ==========
let clickCount = 0;
const header = document.querySelector("header h1");
header.addEventListener("click", () => {
  clickCount++;
  if(clickCount === 5){
    clickCount = 0; // reset counter
    // Show admin prompt
    const email = prompt("Enter admin email:");
    if(email === "mshmhasan1@gmail.com"){
      window.location.href = "admin.html";
    } else {
      alert("Wrong email!");
    }
  }
});
