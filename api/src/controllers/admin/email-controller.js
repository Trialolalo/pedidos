const sequelizeDb = require('../../models/sequelize')
const Email = sequelizeDb.Email

// Crear un nuevo correo electrónico
exports.create = (req, res) => {
  Email.create(req.body)
    .then(email => {
      res.status(200).send(email)
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al insertar el dato.'
      })
    })
}

// Obtener todos los correos electrónicos
exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  Email.findAndCountAll({
    attributes: ['id', 'subject', 'createdAt', 'updatedAt'],
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

  Email.findByPk(id)
    .then(email => {
      if (email) {
        res.status(200).send(email)
      } else {
        res.status(404).send({
          message: `No se puede encontrar el correo electrónico con la id=${id}.`
        })
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: 'Algún error ha surgido al recuperar la id=' + id
      })
    })
}

// Actualizar un correo electrónico por su ID
exports.update = (req, res) => {
  const id = req.params.id

  Email.update(req.body, {
    where: { id }
  })
    .then(([numberRowsAffected]) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El correo electrónico ha sido actualizado correctamente.'
        })
      } else {
        res.status(404).send({
          message: `No se puede actualizar el correo electrónico con la id=${id}. Tal vez no se ha encontrado el correo electrónico o el cuerpo de la petición está vacío.`
        })
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: 'Algún error ha surgido al actualizar la id=' + id
      })
    })
}

// Eliminar un correo electrónico por su ID
exports.delete = (req, res) => {
  const id = req.params.id

  Email.destroy({
    where: { id }
  })
    .then((numberRowsAffected) => {
      if (numberRowsAffected === 1) {
        res.status(200).send({
          message: 'El correo electrónico ha sido eliminado correctamente.'
        })
      } else {
        res.status(404).send({
          message: `No se puede eliminar el correo electrónico con la id=${id}. Tal vez no se ha encontrado el correo electrónico.`
        })
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: 'Algún error ha surgido al borrar la id=' + id
      })
    })
}
