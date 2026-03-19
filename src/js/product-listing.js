import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, qs } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

qs("#title").textContent =
  `Top Products : ${category.charAt(0).toUpperCase() + category.slice(1)}`;

const listElement = qs(".product-list");
const productData = new ProductData();
const productList = new ProductList(category, productData, listElement);
productList.init();
