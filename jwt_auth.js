import jwt from 'jsonwebtoken'
import { StudentModel, UserModel } from './db.js'

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing.' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      return res.status(403).json({ error: 'Invalid user.' })
    }

    // Skip the student linkage check for admin users
    if (user.role === 'admin') {
      req.user = user
      next()
    } else {
      // Check if the user is linked to a student
      if (!user.student) {
        return res.status(403).json({ error: 'User is not linked to a student.' })
      }

      // Verify if the linked student exists
      const student = await StudentModel.findById(user.student)
      if (!student) {
        return res.status(403).json({ error: 'Linked student not found.' })
      }

      req.user = user
      req.student = student
      next()
    }
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' })
  }
}
  
// Authorization middleware for admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ error: 'Unauthorized.' })
  }
}

// Authorization middleware for admin or linked student
const authorizeAdminOrLinkedStudent = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.student.equals(req.student._id)) {
    next()
  } else {
    return res.status(403).json({ error: 'Unauthorized.' })
  }
}

// Authorization middleware for any valid user
const authorizeJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing.' })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' })
  }
}

export { authorizeAdmin, authenticateToken, authorizeAdminOrLinkedStudent, authorizeJWT }