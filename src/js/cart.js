import ShoppingCart from "./ShoppingCart.mjs";

const cartContainer = document.querySelector(".product-list");
const cartFooter = document.querySelector(".cart-footer");

const cart = new ShoppingCart(cartContainer, cartFooter);
cart.renderCartContents();
