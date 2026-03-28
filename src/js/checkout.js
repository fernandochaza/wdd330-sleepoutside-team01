import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");
checkout.init();

document
  .querySelector(".checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await checkout.checkout(event.target);
      // Navigate to success page and clear cart
      window.location.href = "success.html";
      localStorage.removeItem("so-cart");
    } catch (err) {
      alert("There was a problem placing your order. Please try again.");
    }
  });

// Calculate totals only after the user fills in the zip code
qs("#zip").addEventListener("blur", () => {
  checkout.calculateAndDisplayTotals();
});
