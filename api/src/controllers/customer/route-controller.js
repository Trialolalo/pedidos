exports.findAll = (req, res) => {

  const routes = {
    '/cliente': 'home.html',
    '/cliente/productos': 'products.html',
    '/cliente/carrito': 'cart.html',
    '/cliente/pedidos': 'orders.html',
  }

  res.status(200).send(routes)
}