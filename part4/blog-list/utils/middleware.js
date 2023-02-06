const logger = require("../utils/logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
  console.log("tokenExtractor")
  const auth = request.get("authorization")
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "")
    request.token = token
    console.log("tokenExtractor extracted:", token)
  }
  console.log("next from tokenExtractor")
  next()
}

const userExtractor = async (request, response, next) => {
  console.log("userExtractor using token:", request.token)
  if (!request.token) {
    return response.status(401).json({ error: "Unauthorized: no token" })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log("userExtractor decoded:", decodedToken)
  if (!decodedToken.id) {
    console.log("401 here")
    return response.status(401).json({ error: "Unauthorized: token invalid" })
  }
  request.user = await User.findById(decodedToken.id)
  console.log("next from userExtractor")
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log("errorHandler with error:", error.name, error)
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
