import { Router } from 'express'
import { StudentModel } from '../db.js'

const router = Router()

// GET students and display
router.get('/', async (req, res) => {
    try {
      const students = await StudentModel.find()
        .populate({ path: 'year', select: ' -_id year' })
        .populate({ path: 'class', select: '-_id name' })
  
      res.send(students);
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  });

// Create a student POST
// admin only

// Update a student UPDATE
// admin and student

// Delete a student DELETE
// admin only

export default router