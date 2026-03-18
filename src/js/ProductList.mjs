import { renderListWithTemplate, getDiscountPercent } from "./utils.mjs";

function productCardTemplate(product) {
  const { Id, NameWithoutBrand, Images, FinalPrice, Brand, SuggestedRetailPrice } = product;
  const percent = getDiscountPercent(product);

  let priceHtml = `<p class="product-card__price">$${FinalPrice}</p>`;

  if (percent)
    priceHtml += `
      <p class="product-card__original-price"><s>$${SuggestedRetailPrice}</s></p>
      <p class="product-card__discount">${percent}% OFF</p>
    `;
  
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${Id}">
        <img src="${Images.PrimaryMedium}" alt="${NameWithoutBrand}">
        <h3 class="card__brand">${Brand.Name}</h3>
        <h2 class="card__name">${NameWithoutBrand}</h2>
        ${priceHtml}
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(products) {
    renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", true);
  }
}