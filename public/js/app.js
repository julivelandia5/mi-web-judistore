// Manejo básico del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  const producto = carrito.find((p) => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} se agregó al carrito 🛍️`);
}
