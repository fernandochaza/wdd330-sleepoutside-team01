// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param)
}

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

// Calculate discount percentage for a product
export function calculateDiscount(product) {
  const { FinalPrice, SuggestedRetailPrice } = product;

  if (FinalPrice >= SuggestedRetailPrice) return 0;

  const discount = ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
  return Math.round(discount);
}
