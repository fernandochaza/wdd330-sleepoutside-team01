import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");
checkout.init();

document
  .querySelector(".checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    checkout.checkout(event.target);
  });

// Calculate totals only after the user fills in the zip code
qs("#zip").addEventListener("blur", () => {
  checkout.calculateAndDisplayTotals();
});
