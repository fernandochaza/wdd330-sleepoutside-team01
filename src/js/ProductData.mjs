const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const product = await convertToJson(response);
    return product.Result;
  }
  async queryProduct(keyword) {
    // I couldn't find a way to query results from the API. So we need
    // to get all products from all categories and them filter down using the keyword
    const allCategories = ["tents", "backpacks", "sleeping-bags"];

    // This is the same as making separate individual calls
    const results = await Promise.all(
      allCategories.map((cat) => this.getData(cat)),
    );

    // "results" is an array of arrays, we can use .flat() to make it a single array
    const resultsArr = results.flat();

    const lower = keyword.toLowerCase();
    return resultsArr.filter(
      (product) =>
        product.Name.toLowerCase().includes(lower) ||
        product.NameWithoutBrand.toLowerCase().includes(lower),
    );
  }
}
