const { expect } = require('chai')
const request = require('supertest')
const db = require('../db/postgres')
const User = db.model('user')
const app = require('../index')

describe('User api routes', () => {
    const validUser = {
        firstName: 'Jacobe',
        lastName: 'Smith',
        email: 'JS@es6.com',
        password: '123'
    }
    const validUser2 = {
        firstName: 'jes',
        lastName: 'doe',
        email: 'Js@me.com',
        password: '123'
    }
    const invalidUser = {
        firstName: 'Jacobe',
        lastName: 'Smith',
    }

    beforeEach(() => {
        return db.sync({ force: true })
    })
    describe('POST /api/user/ creates a user', () => {

        it('Should Throw a validation error if the user did not provide an email', () => {
            return request(app)
                    .post('/api/user/')
                    .send(invalidUser)
                    .expect(500)
        })
        it('Should create a new user if they do provide an email', () => {
            return request(app)
                    .post('/api/user/')
                    .send(validUser)
                    .expect(201)
        })
        it('Should throw a violation error if the user uses an email that already is being used', () => {
                User.create(validUser)
                .then(newUser => {
                    return request(app)
                            .post('/api/user/')
                            .send(validUser)
                            .expect(500)
                })
        })
    })
    describe('GET /api/user/ gets users', () => {

        beforeEach(() => {
           return User.bulkCreate([validUser, validUser2])
        })

        it('Should get all the users', () => {
            return request(app)
                    .get('/api/user/')
                    .expect(200)
                    .then(res => {
                        expect(res.body.length).to.be.equal(2)
                        expect(res.body[0].email).to.be.equal(validUser.email)
                    })
        })
    })
})
