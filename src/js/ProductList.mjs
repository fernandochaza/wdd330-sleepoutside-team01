import { renderListWithTemplate, getDiscountPercent } from "./utils.mjs";

function productCardTemplate(product) {
  const {
    Id,
    NameWithoutBrand,
    Images,
    FinalPrice,
    Brand,
    SuggestedRetailPrice,
  } = product;
  const percent = getDiscountPercent(product);

  let priceHtml = `<p class="product-card__price">$${FinalPrice}</p>`;

  if (percent)
    priceHtml += `
      <p class="product-card__original-price"><s>$${SuggestedRetailPrice}</s></p>
      <p class="product-card__discount">${percent}% OFF</p>
    `;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${Id}">
        <img 
        src="${Images.PrimaryMedium}"
        srcset="
        ${Images.PrimarySmall} 400w, 
        ${Images.PrimaryMedium} 800w, 
        ${Images.PrimaryLarge} 1200w"
        "
        sizes="
        (max-width: 480px) 100vw,
        (max-width: 768px) 50vw,
        33vw
        "
         alt="${NameWithoutBrand}">

        <h3 class="card__brand">${Brand.Name}</h3>
        <h2 class="card__name">${NameWithoutBrand}</h2>
        ${priceHtml}
      </a>
      <button class="quick-view-btn" data-product-id="${Id}">Quick View</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, datasource, listElement, quickViewModal = null) {
    this.category = category;
    this.datasource = datasource;
    this.listElement = listElement;
    this.products = [];
    this.quickViewModal = quickViewModal;
  }

  async init() {
    this.products = await this.datasource.getData(this.category);
    this.renderList(this.products);
  }

  renderList(products = this.products) {
    this.listElement.innerHTML = "";
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true,
    );
    this.setupQuickViewButtons();
  }

  setupQuickViewButtons() {
    if (!this.quickViewModal) return;

    const buttons = this.listElement.querySelectorAll(".quick-view-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = button.dataset.productId;
        this.quickViewModal.openModal(productId);
      });
    });
  }

  sortProducts(type) {
    let sorted = [...this.products];

    if (type === "name") {
      sorted.sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
      );
    }

    if (type === "price") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    if (type === "price-desc") {
      sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }

    this.renderList(sorted);
  }
}
