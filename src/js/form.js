const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop page reload
    
    const query = input.value.trim();
    
    if (query) {
        // we’ll use this next
        searchProducts(query);
    }
});

function searchProducts(query) {
    fetch(`https://api.example.com/products?search=${query}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => console.error(error));
}

function displayProducts(products) {
    const container = document.getElementById("productList");
    container.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.textContent = product.name; // adjust based on API
        container.appendChild(div);
    });
}

window.location.href = `products.html?search=${query}`;