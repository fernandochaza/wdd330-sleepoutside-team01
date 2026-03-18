import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

import { getParam, qs } from "./utils.mjs";

const category = getParam("category");

const categoryTitleMap = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

const titleH2 = qs("#category-title");
titleH2.textContent = categoryTitleMap[category];

const categoryData = new ProductData(category);

const listContainer = qs(".product-list");

const productList = new ProductList(category, categoryData, listContainer);

productList.init();
