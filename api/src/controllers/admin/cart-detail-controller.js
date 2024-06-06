const sequelizeDb = require('../../models/sequelize')
const CartDetail = sequelizeDb.CartDetail

exports.create = (req, res) => {
  CartDetail.create(req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al insertar el dato.'
      })
    })
}

exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  CartDetail.findAndCountAll({
    attributes: ['id', 'cartId', 'priceDiscountId', 'priceId', 'quantity', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }

      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  CartDetail.findByPk(id, {
    attributes: ['id', 'cartId', 'productId', 'quantity']
  })
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({
          message: `No se puede encontrar el elemento con la id=${id}.`
        })
      }
    })
    .catch(_ => {
      console.log(_)
      res.status(500).send({
        message: 'Algún error ha surgido al recuperar la id=' + id
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  CartDetail.update(req.body, {
    where: { id }
  })
    .then(([numberRowsAffected]) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El elemento ha sido actualizado correctamente.'
        })
      } else {
        res.status(404).send({
          message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
        })
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: 'Algún error ha surgido al actualizar la id=' + id
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  CartDetail.destroy({
    where: { id }
  })
    .then((numberRowsAffected) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El elemento ha sido borrado correctamente'
        })
      } else {
        res.status(404).send({
          message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
        })
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: 'Algún error ha surgido al borrar la id=' + id
      })
    })
}
