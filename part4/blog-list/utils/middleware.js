const logger = require("../utils/logger")

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else {
    logger.error(error)
  }
  next(error)
}

module.exports = { errorHandler }