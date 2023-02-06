const logger = require("../utils/logger")

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization")
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "")
    request.token = token
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "TypeError") {
    return response.status(400).send({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  } else {
    logger.error(error)
  }
  next(error)
}

module.exports = { errorHandler, tokenExtractor }
