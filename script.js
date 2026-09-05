
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
    let orderId =
        "BH" +
        Date.now().toString().slice(-6);
    document.getElementById("order-id")
        .textContent = "#" + orderId;
    // ================= DATE & TIME =================
    const now = new Date();
    document.getElementById("order-date")
        .textContent =
        now.toLocaleDateString();
    document.getElementById("order-time")
        .textContent =
        now.toLocaleTimeString([], {
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
                <span class="receipt-item-name">
                    ${item.name}
                </span>
                <span class="receipt-item-qty">
                    ${item.quantity}
                </span>
                <span class="receipt-item-total">
                    $${itemTotal.toFixed(2)}
                </span>
            </div>
        `;
    });
    // ================= TOTAL =================
    let tax = subtotal * 0.10;
    let total = subtotal + tax;
    document.getElementById("receipt-subtotal")
        .textContent = "$" + subtotal.toFixed(2);
    document.getElementById("receipt-tax")
        .textContent = "$" + tax.toFixed(2);
    document.getElementById("receipt-total")
        .textContent ="$" + total.toFixed(2);
    // ================= PAYMENT =================
    let payment =
        localStorage.getItem("payment") || "Cash";
    document.getElementById("receipt-payment")
        .textContent = payment;
}
// ================= RUN RECEIPT =================
document.addEventListener(
    "DOMContentLoaded",
    displayReceipt
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
// ================= OFFERS =================
function applyOffer(name, price, image) {
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem =
        cart.find(item => item.name === name);
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
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert(
        name + " added to your cart!"
    );
}
// ================= COPY PROMO CODE =================
function copyPromoCode() {
    const code = "BREW10";
    navigator.clipboard.writeText(code)
        .then(function () {
            alert(
                "Promo code " +
                code +
                " copied!"
            );
        })
        .catch(function () {
            alert(
                "Your promo code is: " +
                code
            );
        });
}
// ================= CONTACT FORM =================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            const name =document.getElementById("name").value;
            const email =document.getElementById("email").value;
            const subject =document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            if (
                name === "" ||
                email === "" ||
                subject === "" ||
                message === ""
            ) {
                alert(
                    "Please fill in all required fields."
                );
                return;
            }
            alert(
                "Thank you, " +
                name +
                "! Your message has been sent successfully."
            );
            contactForm.reset();
        }
    );
}
// ================= LOGIN =================
const loginForm =
    document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();
            const password =
                document.getElementById(
                    "loginPassword"
                ).value;
            const rememberMe =
                document.getElementById(
                    "rememberMe"
                ).checked;
            // Check empty fields

            if (
                email === "" ||
                password === ""
            ) {
                alert(
                    "Please enter your email and password."
                );
                return;
            }

            // Get registered user
            const registeredUser =
                JSON.parse(
                    localStorage.getItem(
                        "brewHavenUser"
                    )
                );

            // Check account
            if (!registeredUser) {
                alert(
                    "No account found. Please register first."
                );
                return;
            }
            // Check email & password

            if (
                email === registeredUser.email &&
                password === registeredUser.password
            ) {
                // Save login status
                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );
                localStorage.setItem(
                    "loggedInUser",
                    registeredUser.name
                );
                if (rememberMe) {
                    localStorage.setItem(
                        "rememberMe",
                        "true"
                    );
                }
                alert(
                    "Welcome back, " +
                    registeredUser.name +
                    "!"
                );
                window.location.href = "index.html";
            } else {
                alert(
                    "Incorrect email or password."
                );

            }

        }
    );
}
// ================= REGISTER =================
const registerForm =
    document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            // Get values
            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();
            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();
            const phone =
                document.getElementById(
                    "registerPhone"
                ).value.trim();
            const password =
                document.getElementById(
                    "registerPassword"
                ).value;
            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;
            // ================= VALIDATION =================
            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                password === "" ||
                confirmPassword === ""
            ) {
                alert(
                    "Please fill in all fields."
                );
                return;

            }
            // Password length
            if (password.length < 6) {
                alert(
                    "Password must be at least 6 characters."
                );
                return;
            }
            // Confirm password
            if (
                password !== confirmPassword
            ) {
                alert(
                    "Passwords do not match."
                );

                return;

            }
            // ================= CHECK EXISTING USER =================
            const existingUser =
                JSON.parse(
                    localStorage.getItem(
                        "brewHavenUser"
                    )
                );
            if (
                existingUser &&
                existingUser.email === email
            ) {
                alert(
                    "This email is already registered."
                );
                return;
            }
            // ================= CREATE USER =================
            const user = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };
            // Save user
            localStorage.setItem(
                "brewHavenUser",
                JSON.stringify(user)
            );
            // ================= SUCCESS =================
            alert(
                "Account created successfully!"
            );
            // Go to Login
            window.location.href =
                "login.html";
        }
    );
}
// ================= PROFILE =================
document.addEventListener(
    "DOMContentLoaded",
    function () {
        const profileName = document.getElementById("profileName" );
        const profileEmail = document.getElementById( "profileEmail" );
        const accountName =document.getElementById("accountName" );
        const accountEmail =document.getElementById("accountEmail" );
        const accountPhone = document.getElementById( "accountPhone" );
        // Only run on profile page
        if (
            !profileName || !profileEmail
        ) {
            return;
        }
        // Get logged-in user
        const user = JSON.parse(localStorage.getItem("brewHavenUser" )
            );
        const isLoggedIn =localStorage.getItem( "isLoggedIn" );
        // Check login
        if (
            !user || isLoggedIn !== "true"
        ) {
            alert("Please login to view your profile." );
            window.location.href = "login.html";
            return;
        }
        // Display information
        profileName.textContent = user.name;
        profileEmail.textContent = user.email;
        accountName.textContent = user.name;
        accountEmail.textContent =user.email;
        accountPhone.textContent = user.phone;
    }
);
// ================= LOGOUT =================
function logoutUser() {
    localStorage.removeItem( "isLoggedIn"  );
    localStorage.removeItem( "loggedInUser" );
    localStorage.removeItem( "rememberMe" );
    alert(
        "You have been logged out."
    );
    window.location.href = "index.html";
}
// ================= CHECKOUT =================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const checkoutItems =
            document.getElementById(
                "checkoutItems"
            );


        if (!checkoutItems) {

            return;

        }



        // Get cart

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];



        const subtotalElement =
            document.getElementById(
                "checkoutSubtotal"
            );


        const deliveryElement =
            document.getElementById(
                "checkoutDelivery"
            );


        const totalElement =
            document.getElementById(
                "checkoutTotal"
            );



        // Empty cart

        if (cart.length === 0) {

            checkoutItems.innerHTML = `

                <div class="empty-orders">

                    <div>🛒</div>

                    <h3>
                        Your Cart Is Empty
                    </h3>

                    <p>
                        Please add some items before checkout.
                    </p>

                    <a href="menu.html">
                        Go to Menu
                    </a>

                </div>

            `;

            return;

        }



        let subtotal = 0;



        // Display items

        cart.forEach(function (item) {


            const itemTotal =
                item.price *
                item.quantity;


            subtotal += itemTotal;



            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                    <div class="checkout-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            ${item.quantity}
                            ×
                            $${item.price.toFixed(2)}
                        </p>

                    </div>

                    <div class="checkout-item-price">

                        $${itemTotal.toFixed(2)}

                    </div>

                </div>

            `;

        });



        // Initial delivery

        let delivery = 0;



        subtotalElement.textContent =
            "$" + subtotal.toFixed(2);


        deliveryElement.textContent =
            "$0.00";


        totalElement.textContent =
            "$" + subtotal.toFixed(2);



        // ================= ORDER TYPE =================

        const orderTypes =
            document.querySelectorAll(
                'input[name="orderType"]'
            );


        orderTypes.forEach(function (radio) {

            radio.addEventListener(
                "change",
                function () {


                    if (
                        this.value ===
                        "Delivery"
                    ) {

                        delivery = 1.50;

                    } else {

                        delivery = 0;

                    }


                    deliveryElement.textContent =
                        "$" +
                        delivery.toFixed(2);


                    totalElement.textContent =
                        "$" +
                        (
                            subtotal +
                            delivery
                        ).toFixed(2);

                }
            );

        });



        // ================= FORM =================

        const checkoutForm =
            document.getElementById(
                "checkoutForm"
            );


        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();



                const name =
                    document.getElementById(
                        "checkoutName"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "checkoutPhone"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "checkoutAddress"
                    ).value.trim();



                const orderType =
                    document.querySelector(
                        'input[name="orderType"]:checked'
                    ).value;


                const payment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    ).value;



                // Delivery needs address

                if (
                    orderType === "Delivery" &&
                    address === ""
                ) {

                    alert(
                        "Please enter your delivery address."
                    );

                    return;

                }



                // Create order

                const order = {

                    id:
                        "BH" +
                        Date.now(),

                    customerName:
                        name,

                    phone:
                        phone,

                    address:
                        address,

                    orderType:
                        orderType,

                    payment:
                        payment,

                    items:
                        cart,

                    subtotal:
                        subtotal,

                    delivery:
                        delivery,

                    total:
                        subtotal +
                        delivery,

                    date:
                        new Date().toLocaleString()

                };



                // Get old orders

                const orders =
                    JSON.parse(
                        localStorage.getItem(
                            "brewHavenOrders"
                        )
                    ) || [];



                // Add new order

                orders.push(order);



                // Save orders

                localStorage.setItem(
                    "brewHavenOrders",
                    JSON.stringify(orders)
                );



                // Save latest order

                localStorage.setItem(
                    "latestOrder",
                    JSON.stringify(order)
                );



                // Clear cart

                localStorage.removeItem(
                    "cart"
                );



                // Go receipt

                window.location.href =
                    "receipt.html";

            }
        );

    }
);














