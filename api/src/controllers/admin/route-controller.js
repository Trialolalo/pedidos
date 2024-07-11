exports.findAll = (req, res) => {

  const routes = {
    '/admin/clientes': 'customer.html',
    '/admin/usuarios': 'user.html',
    '/admin/empresa': 'company.html',
    '/admin/categoria-de-productos': 'product-category.html',
    '/admin/productos': 'product.html'
  }

  res.status(200).send(routes)
}