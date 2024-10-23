let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartItemsList = document.getElementById('cart-items-list');
const totalPrice = document.getElementById('total-price');

function renderCart() {
    cartItemsList.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        listItem.innerHTML = `
            <div class="item-details">
                <span>${item.name}</span> 
                <span class="stock-status" style="color: ${item.stock > 0 ? 'green' : 'red'};">
                    ${item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            <div class="item-controls">
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
                </div>
                <div class="item-price">Rs. ${itemTotal}</div>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });

    totalPrice.innerHTML = `Total: Rs. ${totalAmount}`;
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
    } else {
        cartItems.splice(index, 1);
    }
    updateCart();
}

function increaseQuantity(index) {
    if (cartItems[index].quantity < cartItems[index].stock) {
        cartItems[index].quantity++;
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

document.getElementById('checkout').addEventListener('click', function () {
    if (cartItems.length > 0) {
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
        window.location.href = 'payment.html';
    } else {
        alert('Your cart is empty!');
    }
});

renderCart();