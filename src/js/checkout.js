import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const externalServices = new ExternalServices();
const checkout = new CheckoutProcess(externalServices);

const checkout = new CheckoutProcess("so-cart");
checkout.init();

document
  .querySelector(".checkout-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.target;

    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

   
    checkout.checkout(form);
  });
    checkout.checkout(event.target);
  });

// Calculate totals only after the user fills in the zip code
qs("#zip").addEventListener("blur", () => {
  checkout.calculateAndDisplayTotals();
});
