import { Router } from 'express'
import { UserModel } from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

// Register POST Route
router.post('/signup', async (req, res) => {
	try{
		const { name, email, role } = req.body
		let password = req.body.password
		const salt = await bcrypt.genSalt(10)
		password = await bcrypt.hash(password, salt)

		const newUser = await UserModel.create({ name, email, role, password })
    
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
						  });
						  res.status(200).json({ token, message: 'Login successful!' });
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