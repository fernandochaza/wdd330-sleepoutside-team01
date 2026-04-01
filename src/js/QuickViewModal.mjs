import {
  getDiscountPercent,
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  alertMessage,
} from "./utils.mjs";

export default class QuickViewModal {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.currentProduct = null;
    this.modal = null;
    this.initModal();
  }

  initModal() {
    // Create modal HTML structure
    const modalHTML = `
      <div id="quickViewModal" class="modal">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="modal-body">
            <div class="modal-image-container">
              <img id="modalProductImage" src="" alt="Product">
            </div>
            <div class="modal-details">
              <h2 id="modalProductBrand"></h2>
              <h3 id="modalProductName"></h3>
              <div id="modalProductPrice"></div>
              <p id="modalProductColor"></p>
              <div id="modalProductDescription"></div>
              <button id="modalAddToCart" class="modal-add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insert modal into DOM
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    this.modal = document.getElementById("quickViewModal");

    // Setup event listeners
    document
      .querySelector(".modal-close")
      .addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document
      .getElementById("modalAddToCart")
      .addEventListener("click", () => this.addToCart());
  }

  async openModal(productId) {
    try {
      this.currentProduct = await this.dataSource.findProductById(productId);
      this.renderModalContent();
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error loading product for quick view:", error);
      alertMessage("Failed to load product details");
    }
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "auto";
    this.currentProduct = null;
  }

  renderModalContent() {
    const product = this.currentProduct;

    document.getElementById("modalProductBrand").textContent = product.Brand.Name;
    document.getElementById("modalProductName").textContent =
      product.NameWithoutBrand;
    document.getElementById("modalProductImage").src =
      product.Images.PrimaryMedium;
    document.getElementById("modalProductImage").alt =
      product.NameWithoutBrand;

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
    priceHtml += `</div>`;
    document.getElementById("modalProductPrice").innerHTML = priceHtml;

    document.getElementById("modalProductColor").textContent =
      product.Colors[0].ColorName;
    document.getElementById("modalProductDescription").innerHTML =
      product.DescriptionHtmlSimple;

    document.getElementById("modalAddToCart").dataset.id = product.Id;
  }

  addToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const existingItem = cart.find(
      (item) => item.Id === this.currentProduct.Id
    );
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.currentProduct.quantity = 1;
      cart.push(this.currentProduct);
    }
    setLocalStorage("so-cart", cart);
    updateCartCount();
    alertMessage(
      `${this.currentProduct.NameWithoutBrand} added to cart!`
    );
    this.closeModal();
  }
}
