document.addEventListener("DOMContentLoaded", function () {
  const menuItems = [
    { name: 'Aloo Paratha', price: 60, image: 'Images/Aloo Paratha.jpeg', stock: 25 },
    { name: 'Paneer Paratha', price: 80, image: 'Images/Paneer paratha.jpeg', stock: 30 },
    { name: 'Chowmein Roll', price: 50, image: 'Images/Chowmein roll.jpeg', stock: 30 },
    { name: 'Veg Roll', price: 80, image: 'Images/Veg roll.jpeg', stock: 30 },
    { name: 'Samosa', price: 30, image: 'Images/Samosa.jpeg', stock: 30 },
    { name: 'Cold Coffee', price: 70, image: 'Images/Cold coffee.jpeg', stock: 30 },
    { name: 'Chocolateshake', price: 70, image: 'Images/Chocolateshake.jpg', stock: 20 },
    { name: 'Oreoshake', price: 70, image: 'Images/Oreoshake.jpeg', stock: 25 },
    { name: 'Tea', price: 20, image: 'Images/Tea.jpeg', stock: 28 },
    { name: 'Coffee', price: 30, image: 'Images/Coffee.jpeg', stock: 30 },
    { name: 'Maggi', price: 40, image: 'Images/Maggi.jpeg', stock: 30 },
    { name: 'Fried Momos', price: 120, image: 'Images/Fried momos.jpeg', stock: 30 },
    { name: 'Steam Momos', price: 100, image: 'Images/Steam momos.jpg', stock: 30 },
    { name: 'Onion Pizza', price: 100, image: 'Images/Pizza.jpeg', stock: 30 },
    { name: 'Jalapeno Corn Pizza', price: 100, image: 'Images/Jalapeno corn.jpeg', stock: 30 },
    { name: 'Veg Burger', price: 50, image: 'Images/Vegburger.jpeg', stock: 30 },
    { name: 'Paneer Burger', price: 80, image: 'Images/Paneer burger.jpeg', stock: 30 },
    { name: 'French fries', price: 80, image: 'Images/Frenchfries.jpeg', stock: 30 },
    { name: 'Hakka Noodles', price: 160, image: 'Images/Hakkanoodles.jpeg', stock: 30 },
    { name: 'Paneer Patties', price: 35, image: 'Images/Paneer patties.jpeg', stock: 30 }
  ];
  const parentContainer = document.querySelector('.parentContainer');
  const cartCount = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  let cartItems = [];
  let totalItems = 0;

  
  menuItems.forEach(item => {
    const container = document.createElement('div');
    container.classList.add('container');

    const isOutOfStock = item.stock <= 0;

    container.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="menuImage" height="170px">
      <p class="imgHead">${item.name}</p>
      <p class="imgPrice">Rs. ${item.price}</p>
      <div class="counter">
        <button class="value" onclick="decreaseValue(this)" ${isOutOfStock ? 'disabled' : ''}>-</button>
        <input type="text" value="1" readonly ${isOutOfStock ? 'disabled' : ''}>
        <button class="value" onclick="increaseValue(this)" ${isOutOfStock ? 'disabled' : ''}>+</button>
      </div>
      <button class="addCart" ${isOutOfStock ? 'disabled' : ''}>${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</button>
    `;

    parentContainer.appendChild(container);

    if (!isOutOfStock) {
      const addToCartBtn = container.querySelector('.addCart');
      addToCartBtn.addEventListener('click', function () {
        const quantityInput = container.querySelector('input').value;
        addToCart(item, parseInt(quantityInput));
      });
    }
  });

  
  function addToCart(item, quantity) {
    const menuItem = menuItems.find(menuItem => menuItem.name === item.name);

    if (menuItem && menuItem.stock >= quantity) {
      menuItem.stock -= quantity;

      const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({ ...item, quantity });
      }

      totalItems += quantity;
      cartCount.textContent = totalItems;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

    
      updateCartSummary();
      updateStockUI(item.name);

      cartSummary.classList.add('visible');
      setTimeout(() => {
        cartSummary.classList.remove('visible');
      }, 2000);
    } else {
      alert('Not enough stock available.');
    }
  }

 
  function updateCartSummary() {
    cartItemsList.innerHTML = '';
    cartItems.forEach(cartItem => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${cartItem.name} x ${cartItem.quantity}</span>
        <span>Rs. ${cartItem.price * cartItem.quantity}</span>
      `;
      cartItemsList.appendChild(listItem);
    });
  }


  function updateStockUI(itemName) {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      if (container.querySelector('.imgHead').textContent === itemName) {
        const stockItem = menuItems.find(menuItem => menuItem.name === itemName);
        if (stockItem && stockItem.stock <= 0) {
          container.querySelector('.addCart').disabled = true;
          container.querySelector('.addCart').textContent = 'Out of Stock';
          container.querySelectorAll('.value').forEach(button => {
            button.disabled = true;
          });
          container.querySelector('input').disabled = true;
        }
      }
    });
  }


  window.decreaseValue = function (button) {
    const input = button.parentNode.querySelector('input');
    let value = parseInt(input.value);
    if (value > 1) {
      value--;
      input.value = value;
    }
  };

  window.increaseValue = function (button) {
    const input = button.parentNode.querySelector('input');
    let value = parseInt(input.value);
    const itemName = button.closest('.container').querySelector('.imgHead').textContent;
    const menuItem = menuItems.find(menuItem => menuItem.name === itemName);

    if (menuItem && value < menuItem.stock) {
      value++;
      input.value = value;
    } else {
      alert('No more stock available');
    }
  };


  document.getElementById('cart-icon').addEventListener('click', function () {
    window.open('cart.html', '_blank');
  });
});