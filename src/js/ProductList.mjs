import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const { Id, NameWithoutBrand, Image, FinalPrice, Brand } = product;
  return `
    <li class="product-card">
      <a href="product_pages/?product=${Id}">
        <img src="${Image}" alt="${NameWithoutBrand}">
        <h3 class="card__brand">${Brand.Name}</h3>
        <h2 class="card__name">${NameWithoutBrand}</h2>
        <p class="product-card__price">$${FinalPrice}</p>
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