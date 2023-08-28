import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


async function dbClose() {
    await mongoose.connection.close()
    console.log('dbClosed')
}

mongoose.connect(process.env.ATLAS_DB_URL)
.then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose did not connect'))
.catch(err => console.log(err))

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name : {type : String, required : [true,'Please add name']},
    email : {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
     role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },  
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
      },
      student : {type: mongoose.ObjectId, ref: 'student'},
})


const UserModel = mongoose.model('User', userSchema)
  


// CLASS SCHEMA
const classSchema = new mongoose.Schema({
    name : {type : String, required: [true,'Please add name']},
    year: {type: mongoose.ObjectId, ref: 'Year'}
})

classSchema.index({name: 1, year: 1}, {unique: true})
const ClassModel = mongoose.model('Class', classSchema)

// YEAR SCHEMA
const yearSchema = new mongoose.Schema({
    name : {type : String, required: [true,'Please add name'], unique:true}
})

const YearModel = mongoose.model('Year', yearSchema)

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
    firstName : {type: String, required:true},
    lastName: {type: String, required:true},
    // year: {type: mongoose.ObjectId, ref: 'Year'},
    class: {type: mongoose.ObjectId, ref: 'Class'},
    email : {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    photo : String,
    contactDetails: String,
    questionOne : String,
    questionTwo : String,
    questionThree : String,
    questionFour : String,


})

const StudentModel = mongoose.model('Student', studentSchema)

export { StudentModel, UserModel, YearModel, ClassModel, dbClose }