import { loadHeaderFooter , alertMessage} from "./utils.mjs";
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

    const form = event.target;

    const valid = form.checkValidity();
    form.reportValidity();

    if (!valid) return;

    try {
      await checkout.checkout(form);
    } catch (err) {

      let message = "Checkout failed.";

      if (err.message && typeof err.message === "object") {
        message = Object.values(err.message).join(", ");
      }

      alertMessage(message);
    }
  });
