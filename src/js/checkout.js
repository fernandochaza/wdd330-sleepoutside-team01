import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const externalServices = new ExternalServices();
const checkout = new CheckoutProcess(externalServices);

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