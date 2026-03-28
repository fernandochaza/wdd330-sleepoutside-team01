import { getLocalStorage, qs, formDataToJSON } from "./utils.mjs";
import ExternaalServices from "./ExternalServices.mjs";

const externalServices = new ExternaalServices();

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity,
  }));
}

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
    this.cart = [];
  }

  init() {
    this.cart = getLocalStorage(this.key) || [];
    this.calculateAndDisplaySubtotal();
  }

  calculateAndDisplaySubtotal() {
    this.subtotal = this.cart.reduce(
      (acc, item) => acc + item.FinalPrice * item.quantity,
      0,
    );
    qs("#summary-subtotal").textContent = `$${this.subtotal.toFixed(2)}`;
  }

  calculateAndDisplayTotals() {
    // Tax: 6% sales tax on the subtotal
    this.tax = this.subtotal * 0.06;
    qs("#summary-tax").textContent = `$${this.tax.toFixed(2)}`;

    // Shipping: $10 for the first item plus $2 for each additional item
    const itemsQuantity = this.cart.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    this.shipping = itemsQuantity > 0 ? 10 + 2 * (itemsQuantity - 1) : 0;
    qs("#summary-shipping").textContent = `$${this.shipping.toFixed(2)}`;

    // Order total
    this.orderTotal = this.subtotal + this.tax + this.shipping;
    qs("#summary-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const order = formDataToJSON(form);

    order.orderDate = new Date().toISOString();
    order.expiration = `${order.expMonth}/${order.expYear}`;
    delete order.expMonth;
    delete order.expYear;
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.cart);

    try {
      const response = await externalServices.checkout(order);
      return response;
    } 
    catch (err) {
      console.error("Checkout failed:", err);
      throw err; 
    }
    
  }
}
