// --- Persistent Cart State Handler ---
let cart = JSON.parse(localStorage.getItem('ayu-cart')) || [];

// Initialize Page State
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // If on Shop page, render existing quantities
    cart.forEach(item => {
        const container = document.getElementById(`product-${item.id}-actions`);
        if (container) renderQuantityControl(container, item.id, item.qty);
    });

    // If on Cart page, render full cart
    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
});

function saveCart() {
    localStorage.setItem('ayu-cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    const existing = cart.find(i => i.id === productId);
    if (!existing) {
        cart.push({ id: productId, qty: 1 });
    }

    const container = document.getElementById(`product-${productId}-actions`);
    if (container) renderQuantityControl(container, productId, 1);

    saveCart();
}

function renderQuantityControl(container, productId, qty) {
    container.innerHTML = `
        <div class="quantity-control d-flex align-items-center justify-content-between">
            <button class="btn-qty" onclick="changeQty(${productId}, -1)">–</button>
            <span class="qty-count" id="product-${productId}-qty">${qty}</span>
            <button class="btn-qty" onclick="changeQty(${productId}, 1)">+</button>
            <button class="btn-remove" onclick="removeFromCart(${productId})" title="Remove">×</button>
        </div>
    `;
}

function changeQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;

    if (item.qty < 1) {
        removeFromCart(productId);
    } else {
        const qtySpan = document.getElementById(`product-${productId}-qty`);
        if (qtySpan) qtySpan.innerText = item.qty;

        // If on cart page, recalculate subtotals
        if (document.getElementById('cart-items-container')) {
            renderCartPage();
        }
        saveCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);

    const container = document.getElementById(`product-${productId}-actions`);
    if (container) {
        container.innerHTML = `<button class="btn btn-primary" style="padding: 0.5rem 1rem;" onclick="addToCart(${productId})">Add</button>`;
    }

    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }
    saveCart();
}

// --- Cart Page Specific Rendering ---
const products = {
    1: { name: "Rejuvenating Brahmi Oil", price: 35, category: "Wellness Oils", img: "assets/images/product-1.png" },
    2: { name: "Ashwagandha Tea", price: 24, category: "Teas & Infusions", img: "assets/images/herbs.png" },
    3: { name: "Pitta Tranquility Oil", price: 32, category: "Wellness Oils", img: "assets/images/product-1.png" },
    4: { name: "Triphala Gut Balance", price: 18, category: "Supplements", img: "assets/images/herbs.png" },
    5: { name: "Chayavanprash Elixir", price: 35, category: "Immunity Booster", img: "assets/images/product-5.png" },
    6: { name: "Kumkumadi Face Glow", price: 48, category: "Skincare", img: "assets/images/product-6.png" },
    7: { name: "Brahmi Focus Capsules", price: 22, category: "Cognitive Memory", img: "assets/images/product-7.png" },
    8: { name: "Sandalwood Luxury Soap", price: 15, category: "Bath & Body", img: "assets/images/product-8.png" }
};

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    const emptyState = document.getElementById('cart-empty-state');
    const summaryRow = document.getElementById('cart-summary-row');

    if (cart.length === 0) {
        if (emptyState) emptyState.classList.remove('d-none');
        if (summaryRow) summaryRow.classList.add('d-none');
        return;
    } else {
        if (emptyState) emptyState.classList.add('d-none');
        if (summaryRow) summaryRow.classList.remove('d-none');
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const p = products[item.id];
        if (!p) return;
        const lineTotal = p.price * item.qty;
        subtotal += lineTotal;

        html += `
            <div class="cart-item" id="cart-item-${item.id}">
                <img src="${p.img}" alt="${p.name}" class="cart-item-img">
                <div style="flex: 1;">
                    <h3 class="mb-1">${p.name}</h3>
                    <p class="text-secondary small">${p.category}</p>
                </div>
                <div class="d-flex align-items-center gap-5">
                    <div class="quantity-control">
                        <button class="btn-qty" onclick="changeQty(${item.id}, -1)">–</button>
                        <span class="qty-count" id="product-${item.id}-qty">${item.qty}</span>
                        <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <span class="fw-bold" style="min-width: 60px;">$${lineTotal.toFixed(2)}</span>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">×</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Update Summary
    const subtotalEl = document.querySelector('.order-summary-subtotal');
    const totalEl = document.querySelector('.order-summary-total');
    if (subtotalEl && totalEl) {
        subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
        totalEl.innerText = `$${subtotal.toFixed(2)}`;
    }
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalQty;

        badge.style.transform = 'scale(1.2)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
}
