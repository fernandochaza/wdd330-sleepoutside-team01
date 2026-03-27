// ---------------------------
// DOM Utilities
// ---------------------------

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return; //

  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  element.addEventListener("click", callback);
}

// ---------------------------
// Local Storage Utilities
// ---------------------------

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

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

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (!parentElement) return; //

  const htmlStrings = list.map(template);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return; //

  parentElement.innerHTML = template;
  if (callback) callback(data);
}

// ---------------------------
// Template Loading
// ---------------------------

export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

// FIXED VERSION
export async function loadHeaderFooter() {
  const header = qs("#header");
  const footer = qs("#footer");

  try {
    // load header only if it exists
    if (header) {
      const headerHtml = await loadTemplate("/partials/header.html");
      renderWithTemplate(headerHtml, header, null, updateCartCount);
      setupSearch(); // only run if header exists
    }

    // load footer only if it exists
    if (footer) {
      const footerHtml = await loadTemplate("/partials/footer.html");
      renderWithTemplate(footerHtml, footer, null, updateCartCount);
    }
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}

// ---------------------------
// Search Setup
// ---------------------------

function setupSearch() {
  const input = qs("#nav-search-input");
  const icon = qs(".search-icon");

  if (!input || !icon) return;

  function doSearch() {
    const keyword = input.value.trim();
    if (keyword) {
      window.location.href = `/product_listing/index.html?search=${encodeURIComponent(keyword)}`;
    }
  }

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      doSearch();
    }
  });

  icon.addEventListener("click", doSearch);
}

// ---------------------------
// Cart Count
// ---------------------------

export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.length;

  const badge = qs(".cart-count");
  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
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

  const amount = product.SuggestedRetailPrice - product.FinalPrice;

  return Number(amount.toFixed(2));
}

export function getDiscountPercent(product) {
  const amount = getDiscountAmount(product);
  if (!amount) return 0;

  const percent = (amount / product.SuggestedRetailPrice) * 100;

  return Math.round(percent);
}

// ---------------------------
// Form Utilities
// ---------------------------

// takes a form element and returns an object where the key is the "name" of the form input and the value is the "value" of the form input
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// ---------------------------
// Alert Utility
//----------------------------

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.innerHTML = `
    <div class="alert-content">
      <strong>⚠️ Error</strong>
      <p>${message}</p>
    </div>
    <button class="close-btn">✖</button>
  `;

  alert.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-btn')) {
      alert.remove();
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}