import { Router } from 'express'
import { StudentModel, YearModel, ClassModel } from '../db.js'

const router = Router()

// Get all students
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
router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, email, year, className, photo } = req.body;

    const selectedYear = await YearModel.findOne({ year })
    if (!selectedYear) {
      return res.status(404).json({ error: 'Year not found.' })
    }

    const selectedClass = await ClassModel.findOne({ name: className })
    if (!selectedClass) {
      return res.status(404).json({ error: 'Class not found.' })
    }

    const newStudent = await StudentModel.create({ firstname, lastname, email, year: selectedYear._id, class: selectedClass._id, photo })

    await newStudent.populate({ path: 'year', select: ' -_id year' })
    await newStudent.populate({ path: 'class', select: '-_id name' })
    
    res.status(201).send(newStudent)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update a student UPDATE
// admin and student
router.post('/', async (req, res) => {
  try {


    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  })

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