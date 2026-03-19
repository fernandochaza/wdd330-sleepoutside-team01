import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartContainer = document.querySelector(".product-list");
const cartFooter = document.querySelector(".cart-footer");

const cart = new ShoppingCart(cartContainer, cartFooter);
cart.renderCartContents();
