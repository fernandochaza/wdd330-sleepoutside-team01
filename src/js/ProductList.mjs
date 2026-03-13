import { renderListWithTemplate, calculateDiscount } from "./utils.mjs";

function productCardTemplate(product) {
  const { Id, NameWithoutBrand, Image, FinalPrice, Brand, SuggestedRetailPrice } = product;

  const discount = calculateDiscount(product);

  const priceHtml = discount
    ? `
      <p class="product-card__price">$${FinalPrice}</p>
      <p class="product-card__original-price"><s>$${SuggestedRetailPrice}</s></p>
      <p class="product-card__discount">${discount}% OFF</p>
      `
    : `<p class="product-card__price">$${FinalPrice}</p>`;
  
  return `
    <li class="product-card">
      <a href="product_pages/?product=${Id}">
        <img src="${Image}" alt="${NameWithoutBrand}">
        <h3 class="card__brand">${Brand.Name}</h3>
        <h2 class="card__name">${NameWithoutBrand}</h2>
        ${priceHtml}
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, datasource, listElement) {
    this.category = category;
    this.datasource = datasource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.datasource.getData();
    this.renderList(products);
  }

  renderList(products) {
    renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true);
  }
}