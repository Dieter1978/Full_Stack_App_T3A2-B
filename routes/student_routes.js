import { Router } from 'express'
import { StudentModel } from '../db.js'

const router = Router()

// GET students and display
router.get('/', async (req, res) => {
    try {
      const students = await StudentModel.find()
        .populate({ path: 'year', select: ' -_id year' })
        .populate({ path: 'class', select: '-_id name' })
  
      res.send(students)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
})

// Get one student
router.get('/:id', async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id)
          .populate({ path: 'year', select: ' -_id year' })
          .populate({ path: 'class', select: '-_id name' })
    
          if (!student) {
            return res.status(404).send('Student not found.')
          }
        
          res.send(student)

      } catch (error) {
        res.status(500).send({ error: error.message })
      }
})

// Create a student POST
// admin only
// router.post('/', async (req, res) => {
//   try {

//     // const { firstname, lastname, email, year, class, photo } = req.body
//     // const newStudent = await StudentModel.create({ firstname, lastname, email, year: year, class, photo })
//     res.status(201)
//   } catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// })

// Update a student UPDATE
// admin and student

// Delete a student DELETE
// admin only
router.delete('/:id', async (req,res) => {
  try {
      const student = await StudentModel.findByIdAndDelete(req.params.id)
    
      if (student){
          res.sendStatus(200)
      } else {
          res.status(404).send({error: 'Student not Found'})
      }
  }
  catch (err)
    {res.status(500).send(err.message)}
})

export default router