import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  updateCartTotal(cartItems);

  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="remove-item" data-id="${item.Id}">X</span>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

// Update cart count
updateCartCount();

// Update cart total
function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const totalElement = cartFooter.querySelector(".cart-total");

  if (cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );
  totalElement.textContent = `Total: $${total.toFixed(2)}`;

  cartFooter.classList.remove("hide");
}

// Remove item from cart
function removeItemFromCart(event) {
  const id = event.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];
  const index = cartItems.findIndex((item) => item.Id == id);

  if (index > -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
  updateCartCount();
}
