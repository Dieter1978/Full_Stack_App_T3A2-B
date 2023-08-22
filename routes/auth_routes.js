import { Router } from 'express'
import { UserModel } from '../db.js'

const router = Router()

// Register POST Route
router.post('/signup', async (req, res) => {
    const insertedEntry = await UserModel.create({ content: req.body.content })
    res.status(201).send(insertedEntry)
})

// Login POST Route

export default router