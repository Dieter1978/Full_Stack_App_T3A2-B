import {StudentModel, UserModel, YearModel, ClassModel, dbClose} from './db.js'
import bcrypt from 'bcryptjs'



const classes = [
    {name : 'Gecko'},
    {name : 'Salamander'},
    {name : 'Kangaroo'},
    {name : 'Possum'}
]

await ClassModel.deleteMany()
const insertedClasses = await ClassModel.insertMany(classes)
console.log('inserted classes : ' + insertedClasses)

const years =[ 
    {year:'2009', class:[insertedClasses[0], insertedClasses[1]]},
    {year:'2010', class:[insertedClasses[2], insertedClasses[3]]},
]

await YearModel.deleteMany()
const insertedYears = await YearModel.insertMany(years)
console.log('inserted years : ' + insertedYears)

const students =[
    {
        firstname : 'John',
        lastname : 'Rogers',
        year: insertedYears[0],
        class:insertedYears[0].class[0],
        email: 'john.rogers@gmail.com',
        photo: 'http://images.google.com/',
        contactdetails : '+61453267890',
        questionone :'answer 1',
        questiontwo :'answer 2',
        questionthree :'answer 3',
        questionfour :'answer 4',
    },
    {
        firstname : 'Rex',
        lastname : 'Stevens',
        year: insertedYears[1],
        class:insertedYears[1].class[1],
        email: 'rex.stevens@gmail.com',
        photo: 'http://images.google.com/',
        contactdetails : '+61453267340',
        questionone :'answer 1',
        questiontwo :'answer 2',
        questionthree :'answer 3',
        questionfour :'answer 4',
    }


]

await StudentModel.deleteMany()
const insertedStudents = await StudentModel.insertMany(students)
console.log('inserted students: ', insertedStudents)

const salt = await bcrypt.genSalt(10);
const passwordOne = await bcrypt.hash('testing', salt);
const passwordTwo = await bcrypt.hash('anothertesting', salt);

const users = [
    {
      name : 'John',
      email : 'john.smith@gmail.com',
      role : 'admin',
      password : passwordOne,
    },
    {
      name : 'Bill',
      email : 'bill.smith@gmail.com',
      role : 'user',
      password : passwordTwo,
      student : insertedStudents[0]
    }
]

await UserModel.deleteMany()
const insertedUsers = await UserModel.insertMany(users)
console.log('inserted users : ' + insertedUsers)

dbClose()