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

// YEAR SCHEMA

// STUDENT SCHEMA