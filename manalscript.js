let cartItems = [];
let exchangeRate = 1000; // 1 USD to ₦1000

document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Load cart from local storage on page load
    displayFeaturedProducts();
    displayOtherProducts();
    updateCartNotification();
});

// Function to create an "Add to Cart" button
function createAddToCartButton(productName, productPrice) {
    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.classList.add('add-to-cart-btn');

addToCartBtn.style.backgroundColor = '#46227b';

    addToCartBtn.addEventListener('click', () => addToCart(productName, productPrice));
    return addToCartBtn;
}

// Function to create a product div
function createProductDiv(img, productName, productPrice, productDetails, addToCartBtn) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('product-details');

    const namePara = document.createElement('p');
    namePara.textContent = productName;

    const pricePara = document.createElement('p');
    pricePara.textContent = `$${productPrice.toFixed(2)} / ₦${(productPrice * exchangeRate).toFixed(2)}`;

    const detailsPara = document.createElement('p');
    detailsPara.textContent = productDetails;

    detailsDiv.appendChild(namePara);
    detailsDiv.appendChild(pricePara);
    detailsDiv.appendChild(detailsPara);

    productDiv.appendChild(img);
    productDiv.appendChild(detailsDiv);
    productDiv.appendChild(addToCartBtn);

    // Add event listener to open modal on product click
    productDiv.addEventListener('click', () => openModal(createProductModal(productName, productPrice, productDetails, img.src)));

    return productDiv;
}




// Function to display products
function displayProducts(listId, products) {
    const productList = document.getElementById(listId);
    products.forEach(product => {
        const img = document.createElement('img');
        img.src = `manal-products-pictures/${product.image}`;
        img.alt = product.name;

        const addToCartBtn = createAddToCartButton(product.name, product.price);
        const productDiv = createProductDiv(img, product.name, product.price, product.details, addToCartBtn);
        productList.appendChild(productDiv);
    });
}

function displayFeaturedProducts() {
    const featuredProducts = [
        // Add more products as needed
        { name: 'Low cut socks', price: 0.5, image: 'Low cut socks.jpg', details: 'Experience comfort and style with our low cut sock collection.' },
        { name: 'Silvy socks', price: 1.1, image: 'silvy socks.jpg', details: 'Embrace sophistication with our premium Silvy sock collection.' },
        { name: 'Popsocks', price: 1.7, image: 'Popsocks 1700.jpg', details: 'Make a statement with our trendy and colorful Popsocks.' },

        { name: 'Thumb sleeves {thick}', price: 1.2, image: 'thumb sleeve.jpg', details: 'Experience optimal support with our thick and protective thumb sleeves.' },
        { name: 'Sandy socks', price: 0.8, image: 'sandy.jpg', details: 'Step into the beach vibe with our sandy socks, perfect for seaside adventures.' },
        { name: 'Wrist sleeves', price: 1.1, image: 'wrist sleeve.jpg', details: 'Experience support and comfort with our versatile wrist sleeves.' },

        { name: 'Thumb sleeves {light}', price: 0.8, image: 'thumb sleeves.jpg', details: 'Experience lightweight support with our versatile thumb sleeves.' },
        
    ];
    displayProducts('featured-list', featuredProducts);
}

function displayOtherProducts() {
    const otherProducts = [
        
        
        
        
        { name: '', price: 6.5, image: 'shoe1.jpg', details: 'Step into comfort and fashion with our curated range of casual kicks.' },

        { name: '', price: 6, image: 'shoe2.jpg', details: 'Elevate your look with elegant heels designed for every occasion.' },

        { name: '', price: 4.5, image: 'shoe3.jpg', details: 'Unleash your adventurous side with our high-performance athletic shoes.' },

        { name: '', price: 5, image: 'shoe4.jpg', details: 'Make a bold statement with our trendy and vibrant sneaker lineup.' },

        { name: '', price: 3.5, image: 'shoe5.jpg', details: 'Walk with confidence in our supportive and stylish walking shoes.' },

        { name: '', price: 6, image: 'shoe6.jpg', details: 'Explore diverse styles in our exclusive shoe collection.' },

        { name: '', price: 3.5, image: 'shoe7.jpg', details: 'Experience ultimate comfort in our cushioned and ergonomic footwear.' },

        { name: '', price: 4, image: 'shoe8.jpg', details: 'Embrace luxury with our premium leather and suede shoe options.' },

        
        
        // Add more products as needed
    ];
    displayProducts('other-list', otherProducts);
}

// Function to update the cart notification
function updateCartNotification() {
    const cartNotification = document.getElementById('cart-notification');
    const cartCount = cartItems.length;
    cartNotification.textContent = cartCount > 0 ? `Cart: ${cartCount} items` : 'Cart is empty';
}



// Function to add a product to the cart
function addToCart(productName, productPrice) {
    cartItems.push({ name: productName, price: productPrice });
    saveCart(); // Save the updated cart to local storage
    updateCartNotification(); // Update the cart notification
}




// Function to view the cart
function viewCart() {
    // Open the cart modal
    openCartModal();

    // Display cart items in the modal
    const cartContentDiv = document.getElementById('cart-content');
    cartContentDiv.innerHTML = ''; // Clear previous content

    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<span>${item.name} - $${item.price.toFixed(2)}</span> 
                                 <button onclick="removeCartItem(${index})">Remove</button>`;
            cartContentDiv.appendChild(itemDiv);
        });
    } else {
        // Display a message if the cart is empty
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartContentDiv.appendChild(emptyCartMessage);
    }
}

// Function to remove a cart item by index
function removeCartItem(index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    saveCart(); // Save the updated cart to local storage
    viewCart(); // Refresh the cart view
    updateCartNotification(); // Update the cart notification
}
// Function to view the cart
function viewCart() {
    // Open the cart modal
    openCartModal();

    // Display cart items and total in the modal
    const cartContentDiv = document.getElementById('cart-content');
    cartContentDiv.innerHTML = ''; // Clear previous content

    if (cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<span>${item.name} - $${item.price.toFixed(2)}</span> 
                                 <button onclick="removeCartItem(${index})">Remove</button>`;
            cartContentDiv.appendChild(itemDiv);
        });

        // Display total in the modal
        const totalDiv = document.createElement('div');
        const totalInDollars = cartItems.reduce((total, item) => total + item.price, 0);
        const totalInNaira = totalInDollars * exchangeRate;
        totalDiv.innerHTML = `<strong>Total:</strong> $${totalInDollars.toFixed(2)} / ₦${totalInNaira.toFixed(2)}`;
        cartContentDiv.appendChild(totalDiv);

        // Display remove all button
        const removeAllBtn = document.createElement('button');
        removeAllBtn.textContent = 'Remove All';
        removeAllBtn.onclick = removeAllCartItems;
        cartContentDiv.appendChild(removeAllBtn);
    } else {
        // Display a message if the cart is empty
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartContentDiv.appendChild(emptyCartMessage);
    }
}

// Function to remove all items from the cart
function removeAllCartItems() {
    cartItems = [];
    saveCart(); // Save the updated cart to local storage
    viewCart(); // Refresh the cart view
    updateCartNotification(); // Update the cart notification
}



// Function to open the cart modal
function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    openModal(cartModal);
}

// Function to close the cart modal
function closeCartModal() {
    const cartModal = document.getElementById('cart-modal');
    closeModal(cartModal);
}

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}





// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to load the cart from local storage
function loadCart() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
    }
}

// Function to initiate the checkout process


function checkout() {
    // Implement your logic for the checkout process
    // e.g., redirect to a WhatsApp direct message link with cart details
    const checkoutDetails = getCheckoutDetails();
    const whatsappLink = generateWhatsAppLink(checkoutDetails);
    window.open(whatsappLink, '_blank');
}



// Function to get checkout details
function getCheckoutDetails() {
    // Implement your logic to gather and format checkout details
    return cartItems;
}

// Function to generate a WhatsApp direct message link
function generateWhatsAppLink(checkoutDetails) {
    // Implement your logic to generate a WhatsApp link with the checkout details
    // Example: 'https://wa.me/2348101140818?text=Order%20Details:%0A-Product1%20$10%0A-Product2%20$20'
    const phoneNumber = '2347037661098'; // Replace with your WhatsApp business number
    const message = generateCheckoutMessage(checkoutDetails);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}



function generateCheckoutMessage(checkoutDetails) {
    // Implement your logic to format the checkout details into a message
    // Example: 'Order Details:%0A-Product1 $10 / ₦500%0A-Product2 $20 / ₦1000'

    // Calculate the total in dollars and Naira
    const totalInDollars = checkoutDetails.reduce((total, item) => total + item.price, 0);
    const totalInNaira = totalInDollars * exchangeRate;

    // Format individual items and join them with line breaks
    const formattedDetails = checkoutDetails.map(item => `- ${item.name} $${item.price.toFixed(2)} / ₦${(item.price * exchangeRate).toFixed(2)}`).join('%0A');

    // Include the total in the message
    const totalMessage = `Total: $${totalInDollars.toFixed(2)} / ₦${totalInNaira.toFixed(2)}`;

    // Return the final formatted message
    return `Order Details:%0A${formattedDetails}%0A${totalMessage}`;
}


