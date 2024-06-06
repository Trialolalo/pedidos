const sequelizeDb = require('../../models/sequelize')
const LocaleSeoSlug = sequelizeDb.LocaleSeoSlug

exports.create = async (req, res) => {
  try {
    const localeSeoSlug = await LocaleSeoSlug.create(req.body)
    res.status(200).send(localeSeoSlug)
  } catch (err) {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al insertar el dato.'
    })
  }
}

exports.findAll = async (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  try {
    const result = await LocaleSeoSlug.findAndCountAll({
      attributes: ['id', 'slug', 'key', 'title', 'keywords', 'createdAt', 'updatedAt'],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })

    const meta = {
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page
    }

    res.status(200).send({ meta, localeSeoSlugs: result.rows })
  } catch (err) {
    res.status(500).send({
      message: err.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id

  try {
    const localeSeoSlug = await LocaleSeoSlug.findByPk(id, {
      attributes: ['id', 'slug', 'key', 'title', 'keywords', 'createdAt', 'updatedAt']
    })

    if (localeSeoSlug) {
      res.status(200).send(localeSeoSlug)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  } catch (err) {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  try {
    const [numberRowsAffected] = await LocaleSeoSlug.update(req.body, {
      where: { id }
    })

    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
      })
    }
  } catch (err) {
    res.status(500).send({
      message: 'Algún error ha surgido al actualizar la id=' + id
    })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const numberRowsAffected = await LocaleSeoSlug.destroy({
      where: { id }
    })

    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente'
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
      })
    }
  } catch (err) {
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    })
  }
}
