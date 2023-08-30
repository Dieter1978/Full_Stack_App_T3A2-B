import { Router } from 'express'
import { UserModel, StudentModel } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

// Register an account as a student
router.post('/signup', async (req, res) => {
	try{
		const { name, email, role, studentId } = req.body // studentId has been emailed to user as registration code

		// Password encryption
		let password = req.body.password
		const salt = await bcrypt.genSalt(10)
		password = await bcrypt.hash(password, salt)

		// Find the student by ID
		const student = await StudentModel.findById(studentId)

		if (!student) {
			return res.status(400).json({ error: 'Invalid registration code.' })
		}

		// Check if the provided email matches the student's email
		if (email !== student.email) {
			return res.status(400).json({ error: 'Email does not match.' })
		}

		const newUser = await UserModel.create({ name, email, role, password, student: student._id })

		// return user without password
    const returnedUser = await UserModel.findById(newUser._id)
		// Generate a JWT token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRE,
	  })
  
	  res.status(201).json({ token, message: `Registration successful, welcome ${name}!`, user: returnedUser })
	}
	catch (err) {
		res.status(500).send({ error: err.message })
	}
})

// Login route
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	
	// Checking that both email and password are entered
	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required.' })
	}

	try {
		const user = await UserModel.findOne({ email }).select('+password')

		// Check the password if user is found
		if (user) {
			const isPasswordMatch = await bcrypt.compare(password, user.password)
			// Return jwt token if password is correct
			if (isPasswordMatch) {
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRE
				})
				const returnedUser = await UserModel.findOne({ email })
				res.status(200).json({ token, message: 'Login successful!', user: returnedUser })
			} else {
				res.status(400).send('Invalid credentials.')
			}   
		} else {
				res.status(404).send({ error: 'User not found.' })
		}
	}
	catch (err) {
		res.status(500).send({ error: err.message })
	}
})

export default router