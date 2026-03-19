import { getLocalStorage, setLocalStorage, updateCartCount, renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor(cartContainer, cartFooter) {
        this.cartContainer = cartContainer;
        this.cartFooter = cartFooter;
        this.cartItems = [];

        // attach the listener once
        this.cartContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item"))
                this.removeItemFromCart(event);
        });
    }

    renderCartContents() {
        this.cartItems = getLocalStorage("so-cart") || [];
        renderListWithTemplate(cartItemTemplate, this.cartContainer, this.cartItems, "afterbegin", true);

        updateCartCount();
        this.updateCartTotal();
    }

    // Update cart total
    updateCartTotal() {
        const totalElement = this.cartFooter.querySelector(".cart-total");

        if (this.cartItems.length === 0) {
            this.cartFooter.classList.add("hide");
            return;
        }

        const total = this.cartItems.reduce(
            (sum, item) => sum + Number(item.FinalPrice),
            0,
        );
        totalElement.textContent = `Total: $${total.toFixed(2)}`;

        this.cartFooter.classList.remove("hide");
    }

    // Remove item from cart
    removeItemFromCart(event) {
        const id = event.target.dataset.id;
        const index = this.cartItems.findIndex((item) => item.Id == id);

        if (index > -1) {
            this.cartItems.splice(index, 1);
            setLocalStorage("so-cart", this.cartItems);
            this.renderCartContents();
            updateCartCount();
        }
    }
}

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
        <span class="remove-item" data-id="${item.Id}">X</span>

        <a href="#" class="cart-card__image">
            <img
            src="${item.Image}"
            alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        </li>
    `;
}
