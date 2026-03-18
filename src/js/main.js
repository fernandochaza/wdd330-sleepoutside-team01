import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alerts from "./alerts.js";

const alerts = new Alerts("/json/alerts.json");
alerts.init();
// Update cart count on page load
updateCartCount();

const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);
productList.init();

// Newsletter Features
const form = document.getElementById("newsletterForm");
const message = document.getElementById("newsletterMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  // Save email to localStorage
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  subscribers.push(email);
  localStorage.setItem("subscribers", JSON.stringify(subscribers));

  message.textContent = "Thanks for subscribing!";
  form.reset();
});
