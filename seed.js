import {StudentModel, UserModel, YearModel, ClassModel, dbClose} from './db.js'
import bcrypt from 'bcryptjs'


const years =[ 
  {name:'2009'},
  {name:'2010'}
]

await YearModel.deleteMany()
const insertedYears = await YearModel.insertMany(years)
console.log('inserted years : ' + insertedYears)

const classes = [
    {name : 'Gecko', year: insertedYears[0]},
    {name : 'Salamander', year: insertedYears[0]},
    {name : 'Kangaroo', year: insertedYears[1]},
    {name : 'Possum', year: insertedYears[1]}
]

await ClassModel.deleteMany()
const insertedClasses = await ClassModel.insertMany(classes)
console.log('inserted classes : ' + insertedClasses)

const students =[
    {
        firstName : 'John',
        lastName : 'Rogers',
        class:insertedClasses[0],
        email: 'john.rogers@gmail.com',
        photo: 'https://i.pravatar.cc/300?img=16',
        contactDetails : '+61453267890',
        questionOne :'answer 1',
        questionTwo :'answer 2',
        questionThree :'answer 3',
        questionFour :'answer 4',
        quote: 'lorem ipsum'
    },
    {
        firstName : 'Rex',
        lastName : 'Stevens',
        class:insertedClasses[1],
        email: 'rex.stevens@gmail.com',
        photo: 'https://i.pravatar.cc/300?img=25',
        contactDetails : '+61453267340',
        questionOne :'answer 1',
        questionTwo :'answer 2',
        questionThree :'answer 3',
        questionFour :'answer 4',
        quote: 'lorem ipsum'
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