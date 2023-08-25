import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Sign JWT and return
  userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };
  
  // Match user entered password to hashed password in database
  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  



// CLASS SCHEMA
const classSchema = new mongoose.Schema({
    name : {type : String, required: [true,'Please add name']},

})

const ClassModel = mongoose.model('Class', classSchema)

// YEAR SCHEMA
const yearSchema = new mongoose.Schema({
    year : {type : String, required: [true,'Please add name'], unique:true},
    class: [classSchema],

})

const YearModel = mongoose.model('Year', yearSchema)

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
    firstname : {type: String, required:true},
    lastname: {type: String, required:true},
    year: {type: mongoose.ObjectId, ref: 'Year'},
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
    contactdetails: String,
    questionone : String,
    questiontwo : String,
    questionthree : String,
    questionfour : String,


})

const StudentModel = mongoose.model('Student', studentSchema)

export { StudentModel, UserModel, YearModel, ClassModel, dbClose }