document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM content loaded"); // Check if DOMContentLoaded event is triggered
    const itemsContainer = document.querySelector(".items .row");
    console.log("Items container:", itemsContainer); // Check if items container is selected correctly
    const searchInput = document.querySelector(".search input[type='search']");
    console.log("Search input:", searchInput); // Check if search input is selected correctly

    // Function to filter items based on search input
    function filterItems(searchTerm) {
        console.log("Filtering items..."); // Check if the filterItems function is being called
        const items = document.querySelectorAll(".item");
        items.forEach(item => {
            const itemName = item.querySelector(".item-name").textContent.toLowerCase();
            if (itemName.includes(searchTerm.toLowerCase())) {
                item.style.display = "block"; // Show item if it matches the search term
            } else {
                item.style.display = "none"; // Hide item if it doesn't match the search term
            }
        });
    }

    // Event listener for Add to Cart buttons
    itemsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart-btn")) {
            const item = event.target.closest(".item");
            const itemName = item.querySelector(".item-name").textContent;
            const itemPrice = parseFloat(item.querySelector(".item-price").textContent.slice(1)); // remove "$" and parse as float
            const itemImage = item.querySelector("img").src;
            const itemType = item.getAttribute("data-type");
            const newItem = { name: itemName, price: itemPrice, image: itemImage, type: itemType, quantity: 1 }; // Set quantity to 1 by default
            
            // Retrieve existing cart items or initialize an empty array
            let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
            
            // Check if the item already exists in the cart
            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === itemName);
            if (existingItemIndex !== -1) {
                // If item exists, increment its quantity
                cartItems[existingItemIndex].quantity++;
            } else {
                // If item doesn't exist, add it to the cart
                cartItems.push(newItem);
            }
            
            // Store updated cart items in session storage
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            
            // Update cart counter
            const cartCounter = document.getElementById('cart-counter');
            cartCounter.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    });

    // Event listener for search input
    searchInput.addEventListener("input", function() {
        console.log("Search input changed:", this.value); // Check if the search input value is being captured correctly
        const searchTerm = this.value;
        console.log("Search term:", searchTerm); // Check the search term
        filterItems(searchTerm);
    });

    // Initialize cart counter
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
});
