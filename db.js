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

// CLASS SCHEMA

// YEAR SCHEMA

// STUDENT SCHEMA