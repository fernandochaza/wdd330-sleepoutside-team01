import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const externalServices = new ExternalServices();
const checkout = new CheckoutProcess(externalServices);
checkout.init();

document
  .querySelector(".checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await checkout.checkout(event.target);
     showMessage("Order placed successfully! Thank you for your purchase.", "success");
    } catch (err) {
      showMessage(err.message || "Checkout failed. Please try again.", "error");
    }
  });

  function showMessage(message, type) {
  const msg = document.getElementById("checkout-message");

  msg.textContent = message;
  msg.className = type; // "error" or "success"
}

function validateForm(form) {
  const cardNumber = form.cardNumber.value.trim();
  const zip = form.zip.value.trim();
  const expMonth = Number(form.expMonth.value);
  const expYear = Number(form.expYear.value);

  if (cardNumber.length < 12 || cardNumber.length > 19) {
    throw new Error("Invalid credit card number.");
  }

  if (!/^\d{5}$/.test(zip)) {
    throw new Error("Invalid ZIP code. Must be 5 digits.");
  }

  if (expMonth < 1 || expMonth > 12) {
    throw new Error("Invalid expiration month.");
  }

  if (expYear < 24) {
    throw new Error("Card expiration year is invalid.");
  }
}