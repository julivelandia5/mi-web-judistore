// products.js
async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const col = document.createElement('div'); col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card mb-3">
        ${p.image ? `<img src="${p.image}" class="card-img-top" style="max-height:200px;object-fit:cover">` : ''}
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.description}</p>
          <p class="card-text"><strong>$ ${(p.price_cents/100).toFixed(2)}</strong></p>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>`;
    container.appendChild(col);
  });
  updateCartCount();
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  document.getElementById('cart-count').innerText = getCart().reduce((s,i)=>s+i.quantity,0);
}
function addToCart(id) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0) cart[idx].quantity++;
  else cart.push({ id, quantity: 1 });
  saveCart(cart);
  updateCartCount();
}

document.getElementById('checkout').addEventListener('click', async () => {
  const items = getCart();
  if (items.length === 0) return alert('Carrito vacío');
  const res = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });
  const data = await res.json();
  if (data.url) window.location = data.url;
  else alert('Error creando checkout.');
});

loadProducts();
