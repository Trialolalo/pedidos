module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/front/image-controller.js')

  router.get('/image/:filename', controller.getImage)

  app.use('/api/front/images', router)
}
