import app from '../app'
import request from 'supertest'


describe('GET /class', ()=>{
    let res

    beforeEach(async () => {
        res = await request(app).get('/class').set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTc2OGIwMjI0YzM3N2QzOTY5MWY4MSIsImlhdCI6MTY5MjkzMTYxOSwiZXhwIjoxNjk1NTIzNjE5fQ.PhDTOAmTBvG5rgbl1kHlJTnkcrsd2Hz0KCeY8GWCJaM")
       
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

})

describe('GET /class/:year_id', ()=>{
    let res

    beforeEach(async () => {
        res = await request(app).get('/class/64e768b0224c377d39691f78').set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTc2OGIwMjI0YzM3N2QzOTY5MWY4MSIsImlhdCI6MTY5MjkzMTYxOSwiZXhwIjoxNjk1NTIzNjE5fQ.PhDTOAmTBvG5rgbl1kHlJTnkcrsd2Hz0KCeY8GWCJaM")
       
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

})