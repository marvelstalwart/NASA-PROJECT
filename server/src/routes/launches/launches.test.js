const request = require('supertest')
const app = require('../../app')
const { loadPlanetsData } = require('../../models/planets.model')

const {
    mongoDisconnect,
    mongoConnect
} = require('../../services/mongo')

describe('Launches API', ()=> {

    beforeAll( async ()=> {
         mongoConnect()
        await  loadPlanetsData()
    })
    afterAll(()=> {
        mongoDisconnect()
    })

    describe('Test GET /launches', ()=> {
    test('It should respond with 200 success', async ()=> {
        const response = await request(app)
        .get('/v1/launches')
        .expect(200)
        .expect('Content-Type', /json/);
        // expect(response.statusCode).toBe(200);
    })
    
    
    })
    describe('Test POST /launch', ()=> {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: "NCC 1701-D",
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028'
    
        
        }
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: "NCC 1701-D",
            target: 'Kepler-62 f',
           
    
        }
        test('it should respond with 201 success', async ()=> {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date( response.body.launchDate).valueOf()
            
    
            expect (responseDate).toBe(requestDate)
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })
    
        test('it should catch missing required properties', async ()=> {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            })
        })
    
       const launchDataWithInvalidDate =  {
            mission: 'USS Enterprise',
            rocket: "NCC 1701-D",
            target: 'Kepler-62 f',
            launchDate: 'This is not a date'
    
       }
        test('It should catch invalid dates', async ()=> {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error: 'Invalid date'
            })
        })
    })
        
})
