// ---------------------------
// DOM Utilities
// ---------------------------

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// ---------------------------
// Local Storage Utilities
// ---------------------------

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------------------------
// URL Utilities
// ---------------------------

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// ---------------------------
// Rendering Utilities
// ---------------------------

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.length;

  if (count > 0) {
    qs(".cart-count").textContent = count;
    qs(".cart-count").style.display = "flex";
  } else {
    qs(".cart-count").style.display = "none";
  }
}

// ---------------------------
// Pricing Utilities
// ---------------------------

export function isDiscounted(product) {
  return product.FinalPrice < product.SuggestedRetailPrice;
}

export function getDiscountAmount(product) {
  if (!isDiscounted(product)) return 0;

  const amount =
    product.SuggestedRetailPrice - product.FinalPrice;

  return Number(amount.toFixed(2));
}

export function getDiscountPercent(product) {
  const amount = getDiscountAmount(product);
  if (!amount) return 0;

  const percent =
    (amount / product.SuggestedRetailPrice) * 100;

  return Math.round(percent);
}