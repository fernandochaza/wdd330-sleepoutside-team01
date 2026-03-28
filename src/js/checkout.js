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
      alert("Order placed successfully! Thank you for your purchase.");
    } catch (err) {
      alert("There was a problem placing your order. Please try again.");
    }
  });
