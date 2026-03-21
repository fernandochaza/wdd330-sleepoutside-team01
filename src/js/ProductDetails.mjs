import { getLocalStorage, setLocalStorage, updateCartCount, getDiscountPercent } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const existingItem = cart.find(item => item.Id === this.product.Id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }
    setLocalStorage("so-cart", cart);
    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  const priceElement = document.getElementById("productPrice");
  const percent = getDiscountPercent(product);
  let priceHtml = `
    <div class="price-container">
    <span class="final-price">$${product.FinalPrice}</span>
  `;
  if (percent) {
    priceHtml += `
    <span class="original-price">$${product.SuggestedRetailPrice}</span>
    <span class="discount-badge">${percent}% OFF</span>
  `;
  }
  priceElement.innerHTML = priceHtml;


  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
