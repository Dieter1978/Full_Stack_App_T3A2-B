import app from '../app'
import request from 'supertest'
import token from './test_token.js'
// import { StudentModel } from '../db.js'

// Testing get all students
describe ('GET /students', () => {
	let res

	beforeEach(async () => {
		res = await request(app).get('/students').set('Authorization', `bearer ${token}`)
	})
	
	test ('Returns JSON', async () => {
		expect(res.status).toBe(200)
		expect(res.header['content-type']).toMatch('json')
	})

  test('Each student has an "_id" of 24 characters', () => {
    res.body.forEach(el => {
      expect(el._id).toBeDefined()
			expect(el._id).toHaveLength(24)
    })
  })

	test('Each student has a first name, last name, class and email', () => {
    res.body.forEach(el => {
      expect(el.firstName).toBeDefined()
			expect(el.lastName).toBeDefined()
			expect(el.class).toBeDefined()
			expect(el.email).toBeDefined()
    })
  })
})

// Testing get one student
// describe ('GET /students/:id', () => {
// 	let res
// 	// let studentId

// 	beforeEach(async () => {

		// Create a student for testing
	// 	const newStudent = new StudentModel({
	// 		firstName: 'Sarah',
	// 		lastName: 'Malcolm',
	// 		class: '64eed1a162e1fd8293fd2c8d',
	// 		email: 'sarahmalcolm@gmail.com',
	// 		photo: 'https://i.pravatar.cc/300?img=25',
	// 		contactDetails: '',
	// 		questionOne: '',
	// 		questionTwo: '',
	// 		questionThree: '',
	// 		questionFour: '',
	// 		quote: ''
	// 	})
	// 	await newStudent.save()
	// 	studentId = newStudent._id.toString()

// 		res = await request(app).get(`/students/64f075943d65542d36badbaa`).set('Authorization', `bearer ${token}`)
// 	})
	
// 	test ('Returns JSON', async () => {
// 		expect(res.status).toBe(200)
// 		expect(res.header['content-type']).toMatch('json')
// 	})

// 	test('Returns an object with correct ID', () => {
//     expect(res.body).toBeInstanceOf(Object)
// 		expect(res.body._id).toBeDefined()
// 		expect(res.body._id).toMatch('64f075943d65542d36badbaa')
//   })

// 	test('Student contains first name, last name, class, email, photo, four questions and a quote', () => {
// 		expect(res.body.firstName).toBeDefined()
// 		expect(res.body.lastName).toBeDefined()
// 		expect(res.body.class).toBeDefined()
// 		expect(res.body.email).toBeDefined()
// 		expect(res.body.photo).toBeDefined()
// 		expect(res.body.contactDetails).toBeDefined()
// 		expect(res.body.questionOne).toBeDefined()
// 		expect(res.body.questionTwo).toBeDefined()
// 		expect(res.body.questionThree).toBeDefined()
// 		expect(res.body.questionFour).toBeDefined()
// 		expect(res.body.quote).toBeDefined()
//   })
// })

// Testing create a student
// TODO: returning 500 instead of 201
// describe ('POST /students', () => {
//   let res

//   beforeAll(async () => {
//     res = await request(app).post('/students')
// 		.set('Authorization', `bearer ${token}`)
// 		.send({
// 			firstName: 'Bernadette',
// 			lastName: 'Jones',
// 			class: '64eed1a162e1fd8293fd2c8e',
// 			email: 'bernadette@mail.com',
// 			photo: 'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg',
// 			contactDetails: '',
// 			questionOne: '',
// 			questionTwo: '',
// 			questionThree: '',
// 			questionFour: '',
// 			quote: ''
// 		})
//   })

// 	test('Returns a JSON body with _id', () => {
//     expect(res.status).toBe(201)
//     expect(res.header['content-type']).toMatch('json')
//     expect(res.body._id).toBeDefined()
//   })

// 	test('Student is in the correct class', () => {
//     expect(res.body.class).toBeDefined()
//     expect(res.body.class._id).toBeDefined()
//     expect(res.body.class.name).toBeDefined()
//     expect(res.body.class.name).toBe('Kangaroo')
//   })

// 	test('Student has the correct details', () => {
//     expect(res.body.firstName).toBe('Bernadette')
// 		expect(res.body.lastName).toBe('Jones')
// 		expect(res.body.email).toBe('bernadette@mail.com')
// 		expect(res.body.photo).toBe('https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg')
//   })
// })

// Update a class
// describe('PUT /students/:id', () => {
//   let res

//   beforeAll(async () => {
//     res = await request(app).put('/students/64eed1a162e1fd8293fd2c93')
// 		.set('Authorization', `bearer ${token}`)
// 		.send({
// 			firstName: 'Test',
// 			lastName: 'Student',
// 			class: '64eed1a162e1fd8293fd2c8d',
// 			email: 'rex.stevens@gmail.com',
// 			photo: 'https://i.pravatar.cc/300?img=25',
// 			contactDetails: '+61453267340',
// 			questionOne: 'answer 1',
// 			questionTwo: 'answer 2',
// 			questionThree: 'answer 3',
// 			questionFour: 'answer 4',
// 			quote: 'lorem ipsum'
// 		})
//   })

// 	test('Returns a JSON body with _id', () => {
// 		expect(res.status).toBe(200)
// 		expect(res.header['content-type']).toMatch('json')
// 		expect(res.body._id).toBeDefined()
// 	})

// 	test('Student has updated data', () => {
//     expect(res.body.firstName).toBe('Test')
//     expect(res.body.lastName).toBe('Student')
// 	})
// })

// Delete a student
// describe('DELETE /students/:id', () => {
//   let res

//   beforeAll(async () => {
// 		res = await request(app)
// 		.delete('/students/64eed1a162e1fd8293fd2c92')
// 		.set('Authorization', `bearer ${token}`)
// 	})

// 	test ('Deletes a student', async () => {
// 		expect(res.status).toBe(200)
// 	})
// })

// Delete a student
// describe('DELETE /students/:id', () => {
//   let studentId

// 	beforeAll(async () => {

    // Create a student for testing
    // const newStudent = new StudentModel({
    //   firstName: 'Test',
    //   lastName: 'Student',
    //   email: 'test@student.com',
    //   class: '64eed1a162e1fd8293fd2c8e',
    //   photo: 'https://imgv3.fotor.com/images/gallery/AI-3D-Female-Profile-Picture.jpg'
    // })
    // await newStudent.save()
    // studentId = newStudent._id.toString()
  // })

  // test('Deletes a student', async () => {
  //   const response = await request(app)
  //     .delete(`/students/${studentId}`)
  //     .set('Authorization', `Bearer ${token}`)

  //   expect(response.status).toBe(200);

  //   // Make sure the student is deleted from the database
  //   const deletedStudent = await StudentModel.findById(studentId)
  //   expect(deletedStudent).toBeNull()
	// })
// })