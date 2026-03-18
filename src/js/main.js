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
