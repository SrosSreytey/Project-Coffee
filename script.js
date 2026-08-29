
// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// ================= ADD TO CART =================
function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    saveCart();
    alert(name + " added to cart!");
}
// ================= SAVE CART =================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// ================= UPDATE QUANTITY =================
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    displayCart();
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    displayCart();
}
// ================= REMOVE ITEM =================
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}
// ================= DISPLAY CART =================
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const subtotalElement =document.getElementById("subtotal");
    const taxElement =document.getElementById("tax");
    const totalElement =document.getElementById("total");
    const itemCountElement =document.getElementById("item-count");
    if (!cartItems) {
        return;
    }
    cartItems.innerHTML = "";
    let subtotal = 0;
    let totalItems = 0;
    // Empty Cart
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                    Add some delicious coffee
                    from our menu.
                </p>
                <a href="menu.html">
                    Browse Menu
                </a>
            </div>
        `;
        subtotalElement.textContent = "$0.00";
        taxElement.textContent = "$0.00";
        totalElement.textContent = "$0.00";
        itemCountElement.textContent = "0 Items";
        return;
    }
    // Display Items
    cart.forEach((item, index) => {
        let itemTotal =
            item.price * item.quantity;
        subtotal += itemTotal;
        totalItems += item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >
                <div class="cart-item-info">
                    <h3>
                        ${item.name}
                    </h3>
                    <p>
                        Delicious Brew Haven drink
                    </p>
                    <span class="item-price">$${item.price.toFixed(2)}
                    </span>
                </div>
                <div class="quantity">
                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>
                    <span> ${item.quantity}
                    </span>
                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}
                </div>
                <button
                    class="remove"
                    onclick="removeItem(${index})">
                    ✕
                </button>
            </div>
        `;
    });
    // ================= CALCULATE =================
    let tax = subtotal * 0.10;
    let total = subtotal + tax;
    // ================= SHOW TOTAL =================
    subtotalElement.textContent ="$" + subtotal.toFixed(2);
    taxElement.textContent =  "$" + tax.toFixed(2);
    totalElement.textContent ="$" + total.toFixed(2);
    itemCountElement.textContent = totalItems + " Items";
}
// ================= RUN =================
document.addEventListener(
    "DOMContentLoaded",
    displayCart
);
// ================= RECEIPT =================
function displayReceipt() {
    const receiptItems =
        document.getElementById("receipt-items");
    if (!receiptItems) {
        return;
    }
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    // ================= ORDER ID =================
    let orderId = "BH" + Date.now().toString().slice(-6);
    document.getElementById("order-id")
        .textContent = "#" + orderId;
    // ================= DATE & TIME =================
    const now = new Date();
    document.getElementById("order-date")
        .textContent = now.toLocaleDateString();
    document.getElementById("order-time")
        .textContent = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    // ================= ITEMS =================
    receiptItems.innerHTML = "";
    let subtotal = 0;
    cart.forEach(item => {
        let itemTotal =item.price * item.quantity;
        subtotal += itemTotal;
        receiptItems.innerHTML += `
            <div class="receipt-item">
                <span class="receipt-item-name">${item.name}</span>
                <span class="receipt-item-qty">${item.quantity}</span>
                <span class="receipt-item-total"> $${itemTotal.toFixed(2)}</span>
            </div>

        `;
    });

    // ================= TOTAL =================
    let tax =
        subtotal * 0.10;
    let total =
        subtotal + tax;
    document.getElementById("receipt-subtotal")
        .textContent = "$" + subtotal.toFixed(2);
    document.getElementById("receipt-tax")
        .textContent = "$" + tax.toFixed(2);
    document.getElementById("receipt-total")
        .textContent = "$" + total.toFixed(2);
    // ================= PAYMENT =================
    let payment =localStorage.getItem("payment") || "Cash";
    document.getElementById("receipt-payment").textContent = payment;
}
// ================= RUN RECEIPT =================
document.addEventListener(
    "DOMContentLoaded",
    displayReceipt
);
// ================= GALLERY =================
document.addEventListener(
    "DOMContentLoaded",
    function () {
        // ================= FILTER =================
        const filterButtons =
            document.querySelectorAll(".filter-btn");
        const galleryItems =
            document.querySelectorAll(".gallery-item");
        filterButtons.forEach(function (button) {
            button.addEventListener(
                "click",
                function () {
                    let filter =
                        this.getAttribute("data-filter");
                    // Active Button
                    filterButtons.forEach(
                        function (btn) {
                            btn.classList.remove("active");
                        }
                    );
                    this.classList.add("active");
                    // Show / Hide Images
                    galleryItems.forEach(
                        function (item) {
                            if (
                                filter === "all" ||
                                item.classList.contains(filter)
                            ) {
                                item.style.display = "block";
                            } else {
                                item.style.display = "none";
                            }
                        }
                    );
                }
            );
        });
        // ================= LIGHTBOX =================
        const lightbox =
            document.getElementById("lightbox");
        const lightboxImage =
            document.getElementById("lightbox-image");
        const closeButton =
            document.querySelector(".lightbox-close");
        galleryItems.forEach(function (item) {
            item.addEventListener(
                "click",
                function () {
                    const image =this.querySelector("img");
                    lightboxImage.src = image.src;
                    lightboxImage.alt =​image.alt;
                    lightbox.classList.add("show");
                }
            );
        });
        // Close Button
        if (closeButton) {
            closeButton.addEventListener(
                "click",
                function () {
                    lightbox.classList.remove("show");
                }
            );
        }
        // Click Outside Image
        if (lightbox) {
            lightbox.addEventListener(
                "click",
                function (event) {
                    if (
                        event.target === lightbox
                    ) {
                        lightbox.classList.remove("show");
                    }
                }
           );
        }
    }
);




