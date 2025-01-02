// Scroll reveal animation

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to elements you want to animate
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Remove loader after page load
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
    }, 3000);
});

// Product card hover effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.view-details').style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.view-details').style.transform = 'translateY(20px)';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product image gallery
function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

// Handle view details clicks
document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function(e) {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-info h3').textContent;
        const productUrl = productName.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `product-pages/${productUrl}.html`;
    });
});

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on all pages
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add to cart function
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAddedToCartMessage();
}

// Show "Added to Cart" message
function showAddedToCartMessage() {
    const message = document.createElement('div');
    message.className = 'added-to-cart-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Item added to cart
    `;
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Add event listener to "Add to Cart" button
document.addEventListener('DOMContentLoaded', function() {
    // For product detail pages
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productInfo = document.querySelector('.product-info-detailed');
            const product = {
                id: Date.now(),
                name: productInfo.querySelector('.product-title').textContent,
                price: productInfo.querySelector('.price').textContent,
                image: document.getElementById('mainImage').src,
                quantity: 1
            };
            addToCart(product);
        });
    }

    // Render cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }

    // Update cart count on all pages
    updateCartCount();
});

// Render cart items
function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartContent = document.querySelector('.cart-content');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCartMessage.style.display = 'flex';
        return;
    }

    cartContent.style.display = 'grid';
    emptyCartMessage.style.display = 'none';

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <button class="remove-item">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    updateCartTotal();
    addCartEventListeners();
}

// Update cart total
function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('₹', ''));
        return total + (price * item.quantity);
    }, 0);

    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-amount');
    
    if (subtotalElement && totalElement) {
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        totalElement.textContent = `₹${subtotal.toFixed(2)}`;
    }
}

// Add event listeners to cart items
function addCartEventListeners() {
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').dataset.id);
            const item = cart.find(i => i.id === itemId);
            
            if (this.classList.contains('plus')) {
                item.quantity++;
            } else if (this.classList.contains('minus') && item.quantity > 1) {
                item.quantity--;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').dataset.id);
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        });
    });
}
