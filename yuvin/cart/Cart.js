document.addEventListener("DOMContentLoaded", function() {
    const cartItemsBody = document.getElementById("cart-items-body");
    const grandTotalElement = document.getElementById("grand-total");
    const refreshCartButton = document.getElementById("refresh-cart");
    const proceedToPaymentButton = document.getElementById("proceed-to-payment");
    const promoCodeInput = document.getElementById("promo-code");
    const applyPromoCodeButton = document.getElementById("apply-promo-code");

    // Retrieve cart items from session storage
    let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    let appliedPromoCode = false;

    // Function to calculate and display the grand total
    function updateGrandTotal() {
        let grandTotal = 0;
        cartItems.forEach(function(item) {
            grandTotal += item.price * item.quantity;
        });

        // Apply promo code discount if applicable
        if (appliedPromoCode) {
            grandTotal *= 0.9; // Apply 10% discount
        }

        grandTotalElement.textContent = "$" + grandTotal.toFixed(2);
    }

    // Function to apply promo code
    function applyPromoCode() {
        const enteredPromoCode = promoCodeInput.value.trim();
        // You can add your logic to validate the promo code here
        // For simplicity, let's assume the promo code is valid if it's not empty
        if (enteredPromoCode !== "") {
            appliedPromoCode = true;
            updateGrandTotal();
        } else {
            // Display an error message if promo code is empty
            alert("Please enter a valid promo code.");
        }
    }

    // Event listener for applying promo code
    applyPromoCodeButton.addEventListener("click", applyPromoCode);

    // Function to add items to the cart table
    function addItemsToCartTable() {
        cartItemsBody.innerHTML = ""; // Clear existing rows

        cartItems.forEach(function(item, index) {
            const row = document.createElement("tr");

            // Product column (contains image and name)
            const productCell = document.createElement("td");
            const productImage = document.createElement("img");
            productImage.src = item.image;
            productImage.alt = item.name;
            productImage.style.width = "50px"; // Adjust image size as needed
            const productName = document.createTextNode(item.name);
            productCell.appendChild(productImage);
            productCell.appendChild(document.createElement("br")); // Line break
            productCell.appendChild(productName);
            row.appendChild(productCell);

            // Quantity column with input field
            const quantityCell = document.createElement("td");
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = item.quantity;
            quantityInput.min = "1";
            quantityInput.addEventListener("change", function() {
                const newQuantity = parseInt(quantityInput.value);
                if (!isNaN(newQuantity) && newQuantity >= 1) {
                    item.quantity = newQuantity;
                    updateGrandTotal();
                    updatePrice(); // Call updatePrice() when quantity changes
                    updateSessionStorage(); // Update session storage after quantity change
                } else {
                    quantityInput.value = item.quantity;
                }
            });
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);

            // Price column
            const priceCell = document.createElement("td");
            priceCell.classList.add("price-cell"); // Add class for easy selection
            priceCell.textContent = "$" + (item.price * item.quantity).toFixed(2); // Calculate initial price based on quantity
            row.appendChild(priceCell);

            // Action column with remove button
            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-item-btn");
            removeButton.addEventListener("click", function() {
                removeItem(index); // Call removeItem function passing index
            });
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            cartItemsBody.appendChild(row);
        });

        // Update grand total
        updateGrandTotal();
    }

    // Function to update the price when quantity changes
    function updatePrice() {
        const priceCells = document.querySelectorAll(".price-cell");
        priceCells.forEach(function(priceCell, index) {
            const item = cartItems[index];
            priceCell.textContent = "$" + (item.price * item.quantity).toFixed(2);
        });
    }

    // Function to update session storage
    function updateSessionStorage() {
        sessionStorage.setItem("cart", JSON.stringify(cartItems)); // Update session storage
    }

    // Function to remove an item from the cart
    function removeItem(index) {
        cartItems.splice(index, 1); // Remove item from array
        addItemsToCartTable(); // Update cart display
        updateSessionStorage(); // Update session storage after removing item
    }

    // Event listener for refreshing the cart
    refreshCartButton.addEventListener("click", function() {
        // Clear cart items from session storage
        sessionStorage.removeItem("cart");
        // Reset cartItems array
        cartItems = [];
        // Clear items displayed in the cart table
        cartItemsBody.innerHTML = "";
        // Reset grand total
        grandTotalElement.textContent = "$0.00";
    });

    // Event listener for proceeding to payment
    proceedToPaymentButton.addEventListener("click", function() {
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before proceeding to payment.");
            event.preventDefault();
        } else {
            // Code to proceed to payment
            // You can redirect to the payment page or perform other actions here
        }
    });

    // Call the function to add items to the cart table when the DOM is loaded
    addItemsToCartTable();
});
