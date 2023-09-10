const products = [
  { id: 1, name: 'Producto 1', price: 60.00, image: 'imagen1.jpg' },
  { id: 2, name: 'Producto 2', price: 40.00, image: 'imagen2.jpg' },
  { id: 3, name: 'Producto 3', price: 70.00, image: 'imagen3.jpg' },
  { id: 4, name: 'Producto 4', price: 55.00, image: 'imagen4.jpg' },
  { id: 5, name: 'Producto 5', price: 80.00, image: 'imagen5.jpg' },
  { id: 6, name: 'Producto 6', price: 50.00, image: 'imagen6.jpg' }
  // agrega más productos aquí
];

// variables para el carrito de compras
const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const openCartButton = document.querySelector('.open-cart');

// función para generar las tarjetas de producto
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>Precio: $${product.price.toFixed(2)}</p>
      <button class="buy-button" data-id="${product.id}">Comprar</button>
  `;
  return card;
}

// agregar las tarjetas de producto al contenedor
const productContainer = document.querySelector('.product-container');
products.forEach(product => {
  const card = createProductCard(product);
  productContainer.appendChild(card);
});

// evento para agregar productos al carrito
productContainer.addEventListener('click', event => {
  if (event.target.classList.contains('buy-button')) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      const productToAdd = products.find(product => product.id === productId);
      if (productToAdd) {
          cart.push(productToAdd);
          updateCart();
      }
  }
});

// función para actualizar el contenido del carrito
function updateCart() {
  cartItemsContainer.innerHTML = '';
  cart.forEach(product => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <img src="images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Precio: $${product.price.toFixed(2)}</p>
          <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
      `;
      cartItemsContainer.appendChild(cartItem);
  });
}

// evento para quitar productos del carrito
cartItemsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('remove-from-cart')) {
      const productId = parseInt(event.target.getAttribute('data-id'));
      const indexToRemove = cart.findIndex(product => product.id === productId);
      if (indexToRemove !== -1) {
          cart.splice(indexToRemove, 1);
          updateCart();
      }
  }
});

// evento para abrir y cerrar el carrito
openCartButton.addEventListener('click', () => {
  const cartContainer = document.querySelector('.cart');
  cartContainer.classList.toggle('cart-open');
});

// evento para realizar la compra
const checkoutButton = document.querySelector('.checkout');
const cancelButton = document.querySelector('.cancel');

checkoutButton.addEventListener('click', () => {
  if (cart.length > 0) {
      Swal.fire({
          title: "Confirmar compra",
          text: "¿Estás seguro de que deseas realizar la compra?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar"
      }).then((result) => {
          if (result.isConfirmed) {
              // simular la compra 
              Swal.fire(
                  "Compra realizada!",
                  "¡Gracias por tu compra!",
                  "success"
              ).then(() => {
                  cart.length = 0; // vaciar el carrito después de la compra
                  updateCart();
              });
          }
      });
  } else {
      Swal.fire("Carrito vacío", "Agrega productos al carrito antes de realizar la compra", "warning");
  }
});

// evento para cancelar la compra
cancelButton.addEventListener('click', () => {
  if (cart.length > 0) {
      Swal.fire({
          title: "Cancelar compra",
          text: "¿Estás seguro de que quieres cancelar la compra?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar"
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire("Compra cancelada", "Tu compra ha sido cancelada", "info");
              updateCart(); // actualiza el carrito para mostrar los productos actuales
          }
      });
  } else {
      Swal.fire("Carrito vacío", "No hay productos en el carrito para cancelar", "warning");
  }
});

// almacenar el carrito (localStorage)
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// cargar el carrito desde el almacenamiento local al cargar la página
window.addEventListener('load', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      cart.push(...JSON.parse(savedCart));
      updateCart();
  }
});

// guardar el carrito en el almacenamiento local al hacer cambios
window.addEventListener('beforeunload', () => {
  saveCartToLocalStorage();
});