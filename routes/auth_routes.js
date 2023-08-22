import { Router } from 'express'
import { UserModel } from '../db.js'

const router = Router()

// Register POST Route
router.post('/signup', async (req, res) => {
    try{
        const { name, email, role, password } = req.body
        await UserModel.create({ name, email, role, password })
        res.status(201).send(`Welcome ${name}!`)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Login POST Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await UserModel.findOne({ email }).select('+password')


})

export default router