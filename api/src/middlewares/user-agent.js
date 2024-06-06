const userAgentMiddleware = (req, res, next) => {
  req.userLanguage = req.headers['accept-language'] ? (req.headers['accept-language'].split(',')[0]).split('-')[0] : 'es'
  next()
}

module.exports = userAgentMiddleware
