const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (request, response, next) => {
  // Get token from header
  const token = request.header('x-auth-token')

  // Check if not token
  if (!token) {
    return response.status(401).json({ message: 'Missing token, athorization denied' })
  }

  // Decode token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    request.user = decoded.user
    next()
  } catch (error) {
    response.status(401).json({ message: 'Invalid token, athorization denied' })
  }
}
