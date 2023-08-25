import app from '../app'
import request from 'supertest'


describe('GET /class', ()=>{
    let res

    beforeEach(async () => {
        res = await request(app).get('/class')
       
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
        res = await request(app).get('/class/64e768b0224c377d39691f78')
       
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