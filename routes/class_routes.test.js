import app from '../app'
import request from 'supertest'
import token from './test_token.js'

// Testing get all classes
describe ('GET /classes', () => {
	let res

	beforeEach(async () => {
		res = await request(app).get('/classes').set('Authorization', `bearer ${token}`)
	})
	
	test ('Returns JSON', async () => {
		expect(res.status).toBe(200)
		expect(res.header['content-type']).toMatch('json')
	})

    test("Each class has an '_id', 'name' and 'year'", () => {
        res.body.forEach(el => {
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        expect(el.year).toBeDefined()
        })
    })

})

/*describe('GET /classes/:year_id', ()=>{
    let res

    beforeEach(async () => {
        res = await request(app).get('/classes/64eed1a162e1fd8293fd2c86').set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWVkMWEyNjJlMWZkODI5M2ZkMmM5NiIsImlhdCI6MTY5MzM5MjM2OSwiZXhwIjoxNjk1OTg0MzY5fQ.m1URVEWklTi5zs950GmIwxnwMY1i5rZvqfDhuycslA0")
       
    }) 

    test('Returns JSON', async ()=>{
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('application/json')
    })

    test("Each class has a 'name' and '_id'", () => {
        res.body.forEach(el => {
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        })
    })

})*/


// Values are unique so you can only test them once and then you have to change the values manually.
/*describe('/POST create a new class', () => {
    let res

    beforeAll(async () => {
        res = await request(app).post('/classes').set('Authorization', `bearer ${token}`).send({name: 'Falcon', year:'2020'})
        
    })

    test('Returns a JSON body with _id', ()=>{
        expect(res.status).toBe(201)
        expect(res.header['content-type']).toMatch('application/json')
        expect(res.body._id).toBeDefined()

    })

    test('Year has _id and correct year', () => {
        expect(res.body._id).toBeDefined()
        expect(res.body.name).toBeDefined()
        expect(res.body.name).toBe('Falcon')
    })


})*/

// describe('/PUT update a  class', () => {
//     let res

//     beforeAll(async () => {
//         res = await request(app).put('/classes/64f00d54510896981eb72e89').set('Authorization', `bearer ${token}`).send({name: 'Tiger', year : {_id : '64eed38f7efa4d406c7ee7ba', name : '2020' }})
        
//     })

//     test('Returns a JSON body with _id', ()=>{
//         expect(res.status).toBe(200)
//         expect(res.header['content-type']).toMatch('application/json')
//         expect(res.body._id).toBeDefined()

//     })

//     test('Class has correct name', () => {
//         //expect(res.body._id).toBeDefined()
//         expect(res.body.name).toBeDefined()
//         expect(res.body.name).toBe('Tiger')
//     })

// })