import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import QuickViewModal from "./QuickViewModal.mjs";
import { loadHeaderFooter, getParam, qs } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const search = getParam("search");
const productData = new ExternalServices();
const listElement = qs(".product-list");
const quickViewModal = new QuickViewModal(productData);

// If the queryParam "search" is present, the listing is coming from a search
if (search) {
  qs("#title").textContent = `Search results for: "${search}"`;
  productData.queryProduct(search).then((products) => {
    if (products.length === 0) {
      listElement.innerHTML = `<p class="no-results">No products found for "${search}".</p>`;
    } else {
      const productList = new ProductList(
        null,
        productData,
        listElement,
        quickViewModal,
      );
      productList.products = products;
      productList.renderList(products);

      const sortSelect = qs("#sort");

      sortSelect.addEventListener("change", (e) => {
        productList.sortProducts(e.target.value);
      });
    }
  });
} else {
  qs("#title").textContent =
    `Top Products : ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  const productList = new ProductList(
    category,
    productData,
    listElement,
    quickViewModal,
  );
  productList.init().then(() => {
    const sortSelect = qs("#sort");

    sortSelect.addEventListener("change", (e) => {
      productList.sortProducts(e.target.value);
    });
  });
}
