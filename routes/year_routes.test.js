import app from '../app'
import request from 'supertest'

const validYears =['2009','2010','2011','2012','2015']


//POST METHOD works on a year which is unique so it will fail on a second attempt.

/*describe('create a new year', () => {
    let res

    beforeAll(async () => {
        res = await request(app).post('/year').send({year:'2013'})
        
    })

    test('Returns a JSON body with _id', ()=>{
        expect(res.status).toBe(201)
        expect(res.header['content-type']).toMatch('application/json')
        expect(res.body._id).toBeDefined()

    })

    test('Year has _id and correct year', () => {
        expect(res.body._id).toBeDefined()
        expect(res.body.year).toBeDefined()
        expect(res.body.year).toBe('2013')
    })


})*/

describe('GET /years', () => {
    let res

    beforeEach(async () => {
        res = await request(app).get('/years').set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTc2OGIwMjI0YzM3N2QzOTY5MWY4MSIsImlhdCI6MTY5MjkzMTYxOSwiZXhwIjoxNjk1NTIzNjE5fQ.PhDTOAmTBvG5rgbl1kHlJTnkcrsd2Hz0KCeY8GWCJaM")
       
    })

    test('Returns JSON', async ()=>{
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('application/json')
    })

    test('Returns an array of 2 elements', ()=>{
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(2)
    })

    test("Year has a year value thats valid", () => {
        res.body.forEach(el => {
        expect(el.year).toBeDefined()
        expect(validYears).toContain(el.year)
        })
    })

})

/*
describe('update a year', () => {
    let res

    beforeAll(async () => {
        res = await request(app).put('/year/64e6ce68b84ec274f21806a9').send({year :'2015'})
        
    })

    test('Returns a JSON body with _id', ()=>{
        expect(res.status).toBe(201)
        expect(res.header['content-type']).toMatch('application/json')
        expect(res.body._id).toBeDefined()

    })

    test('Year has _id and correct year', () => {
        expect(res.body._id).toBeDefined()
        expect(res.body.year).toBeDefined()
        expect(res.body.year).toBe('2014')
    })


})*/