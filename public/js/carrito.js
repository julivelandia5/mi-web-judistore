// carrito.js

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const listaCarrito = document.getElementById('lista-carrito');
const btnWhatsApp = document.getElementById('btn-wsp');

// Mostrar productos en el carrito
function mostrarCarrito() {
  if (!listaCarrito) return;
  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p>Tu carrito está vacío 🛒</p>';
    if (btnWhatsApp) btnWhatsApp.style.display = 'none';
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-carrito');
    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <strong>$${item.precio * item.cantidad}</strong>
      <button class="btn-eliminar" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(div);
  });

  if (btnWhatsApp) btnWhatsApp.style.display = 'block';

  document.querySelectorAll('.btn-eliminar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
    });
  });
}

mostrarCarrito();

// Enviar pedido a WhatsApp
if (btnWhatsApp) {
  btnWhatsApp.addEventListener('click', () => {
    if (carrito.length === 0) return alert('Tu carrito está vacío');

    const numero = '573001234567'; // 🔸 Cambia por tu número de WhatsApp con código de país
    let mensaje = '🛍 *Nuevo pedido desde Mi Tienda*%0A%0A';

    carrito.forEach((item) => {
      mensaje += `• ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}%0A`;
    });

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    mensaje += `%0A💰 *Total:* $${total}%0A%0A📦 ¡Gracias por tu compra!`;

    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
  });
}
