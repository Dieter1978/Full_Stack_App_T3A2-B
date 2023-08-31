import app from '../app'
import request from 'supertest'
import token from './test_token.js'

const validYears =['2009','2010','2011','2012','2015','2020']


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
        res = await request(app).get('/years').set('Authorization', `Bearer ${token}`)
       
    })

    test('Returns JSON', async ()=>{
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch('application/json')
    })

    test('Returns an array of 3 elements', ()=>{
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body).toHaveLength(3)
    })

    test("Year has a year value thats valid", () => {
        res.body.forEach(el => {
        expect(el.name).toBeDefined()
        expect(validYears).toContain(el.name)
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