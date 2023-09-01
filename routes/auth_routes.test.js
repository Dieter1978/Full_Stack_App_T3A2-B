import app from '../app'
import request from 'supertest'

// Testing login route
describe ('POST /login', () => {
	let res

	beforeEach(async () => {
		res = await request(app)
      .post('/login')
      .send({
        email: 'bill.smith@gmail.com',
        password: 'anothertesting',
      })
	})

	test ('Existing user can login successfully and receive a token', async () => {
		expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.message).toBe('Login successful!')
	})

	test ('Returns the correct user information', async () => {
		expect(res.body.user.name).toMatch('Bill')
		expect(res.body.user.email).toMatch('bill.smith@gmail.com')
		expect(res.body.user.student).toMatch('64f075943d65542d36badbaa')
	})
	
})

// Testing register route
// describe ('POST /signup', () => {
// 	let res

// 	beforeEach(async () => {
// 		res = await request(app)
//       .post('/signup')
//       .send({
// 				name: 'Rex Stevens',
// 				password: '1234567',
// 				email: 'rex.stevens@gmail.com',
// 				studentId: '64f075943d65542d36badbab'
//       })
// 	})

// 	test ('User is able to register with valid student ID and receive a token', async () => {
// 		expect(res.status).toBe(201)
//     expect(res.body.token).toBeDefined()
//     expect(res.body.message).toContain('Registration successful')
// 	})
// })