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
})


const UserModel = mongoose.model('User', userSchema)


// CLASS SCHEMA
const classSchema = new mongoose.Schema({
    name : {type : String, required: [true,'Please add name']},

})

const ClassModel = mongoose.model('Class', classSchema)

// YEAR SCHEMA
const yearSchema = new mongoose.Schema({
    year : {type : String, required: [true,'Please add name']},

})

const YearModel = mongoose.model('Year', yearSchema)

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
    firstname : {type: String, required:true},
    lastname: {type: String, required:true},
    year: {type: mongoose.ObjectId, ref: 'year'},
    class: {type: mongoose.ObjectId, ref: 'class'},
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
    contactdetails: String,
    questionone : String,
    questiontwo : String,
    questionthree : String,
    questionfour : String,


})

const StudentModel = mongoose.model('Student', studentSchema)