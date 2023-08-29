import { Router } from 'express'
import { ClassModel, StudentModel, UserModel, YearModel } from '../db.js'
import { authenticateToken, authorizeAdmin, authorizeAdminOrLinkedStudent, authorizeJWT } from '../jwt_auth.js'

const router = Router()

// Get all students
// Accessible by any valid user
router.get('/', authorizeJWT, async (req, res) => {
  try {
    const students = await StudentModel.find()
      // .populate({ path: 'class', select: '-_id name' })
      // .populate({ path: 'class', select: '_id name', populate: {path: 'year'} })

    res.send(students)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get one student
// Accessible by any valid user
router.get('/:id', authorizeJWT, async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id)
      // .populate({ path: 'year', select: ' -_id year' })
      // .populate({ path: 'class', select: '-_id name' })

    if (!student) {
      return res.status(404).send('Student not found.')
    }
  
    res.send(student)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Create a student
// Admin access only
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, class: className, photo } = req.body

    // // Check if year exists
    // const selectedYear = await YearModel.findOne({ year })
    // if (!selectedYear) {
    //   return res.status(404).json({ error: 'Year not found.' })
    // }
    
    // Check if class exists
    const selectedClass = await ClassModel.findOne({name: className})
    if (!selectedClass) {
      return res.status(404).json({ error: 'Class not found' })
    }

    const newStudent = await StudentModel.create({
      firstName,
      lastName,
      email,
      // year: selectedYear._id,
      class: selectedClass._id,
      photo,
      questionOne: '',
      questionTwo: '',
      questionThree: '',
      questionFour: '',
      contactDetails: '',
      quote: ''
    })

    // await newStudent.populate({ path: 'year', select: ' -_id year' })
    // await newStudent.populate({ path: 'class', select: '-_id name' })
    
    res.status(201).send(newStudent)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update a student, including questionnaire
// Accessible by admin and user that is linked to that student
router.put('/:id', authenticateToken, authorizeAdminOrLinkedStudent, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      class: classId,
      photo,
      contactDetails,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      quote
    } = req.body
    
    // // Check if year exists
    // const selectedYear = await YearModel.findOne({ year })
    // if (!selectedYear) {
    //   return res.status(404).json({ error: 'Year not found.' })
    // }

    // Check if class exists
    const selectedClass = await ClassModel.findById(classId)
    if (!selectedClass) {
      return res.status(404).json({ error: 'Class not found' })
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      req.params.id, {
        firstName,
        lastName,
        email,
        // year: selectedYear._id,
        class: selectedClass._id,
        photo,
        contactDetails,
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        quote
      }, { new: true }
    )

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found.' })
    }

    // await updatedStudent.populate({ path: 'year', select: ' -_id year' })
    // await updatedStudent.populate({ path: 'class', select: '_id name' })

    res.status(200).json(updatedStudent)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Delete a student
// Admin access only
router.delete('/:id', authenticateToken, authorizeAdmin, async (req,res) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id)
  
    if (student){
      const user = await UserModel.findOneAndDelete({ email: student.email })
      res.sendStatus(200)
    } else {
      res.status(404).send({error: 'Student not Found'})
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

export default router