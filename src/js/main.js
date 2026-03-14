import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alert from "./Alert.js";

// Update cart count on page load
updateCartCount();

const productData = new ProductData("tents");
const productList = new ProductList(
  "tents",
  productData,
  document.querySelector(".product-list"),
);
productList.init();

// Example usage of Alert class
const alertSystem = new Alert();
alertSystem.renderAlert();
