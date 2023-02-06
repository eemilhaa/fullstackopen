const logger = require("../utils/logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization")
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "")
    request.token = token
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    console.log("401 here")
    return response.status(401).json({ error: "token invalid" })
  }
  request.user = await User.findById(decodedToken.id)
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

module.exports = { errorHandler, tokenExtractor, userExtractor }
