import { Router } from 'express'
import { UserModel, StudentModel } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

// Register POST Route
router.post('/signup', async (req, res) => {
	try{
		const { name, email, role, studentId } = req.body
		let password = req.body.password
		const salt = await bcrypt.genSalt(10)
		password = await bcrypt.hash(password, salt)

		// Find the student by ID
		const student = await StudentModel.findById(studentId);

		if (!student) {
			return res.status(400).json({ error: 'Invalid invitation code.' })
		}

		// Check if the provided email matches the student's email
		if (email !== student.email) {
			return res.status(400).json({ error: 'Email does not match.' })
		}

		const newUser = await UserModel.create({ name, email, role, password, student: student._id })
    
		// Generate a JWT token for the new user
    	const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	  })
  
	  res.status(201).json({ token, message: `Welcome ${name}!` })
	}
	catch (err) {
			res.status(500).send({ error: err.message })
	}
})

// Login POST Route
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	
	if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required.' })
	}

	try {
			const user = await UserModel.findOne({ email }).select('+password')
			if (user) {
					const isPasswordMatch = bcrypt.compare(password, user.password)
					if (isPasswordMatch) {
						const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
							expiresIn: process.env.JWT_EXPIRE
						  })
						  res.status(200).json({ token, message: 'Login successful!' })
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