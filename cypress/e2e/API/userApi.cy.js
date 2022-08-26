import user from '../../fixtures/apiMock/user.js'
import {faker} from '@faker-js/faker';

describe('Create user', () => {
    let userID = ''

    it('Create user without name', () => {
        user.post({
            name: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('name');
            expect(response.body[0].message).eql('can\'t be blank');
        })
    })

    it('Create user without gender', () => {
        user.post({
            gender: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('gender');
            expect(response.body[0].message).eql('can\'t be blank, can be male or female');
        })
    })

    it('Create user without email', () => {
        user.post({
            email: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email');
            expect(response.body[0].message).eql('can\'t be blank');
        })
    })

    it('Create user without status', () => {
        user.post({
            status: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('status')
            expect(response.body[0].message).eql('can\'t be blank');
        })
    })

    it('Create user with invalid email format - missing domain', () => {
        user.post({
            email: 'test@.com',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('is invalid');
        })
    })

    it('Create user with invalid email format - missing username', () => {
        user.post({
            email: '@gmail.com',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('is invalid');
        })
    })

    // Ovaj test case pada jer smatram da je ovo bug
    // jer dopusta kreiranje usera sa email-om koji nema .com (TLD)
    // ocekivano je da user ne bude kreiran i izbaci nam gresku 'invalid email',
    // medjutim user je kreiran
    it('Create user with invalid email format - missing .com', () => {
        user.post({
            email: faker.internet.email().replace('.com', ''),
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('invalid email');
        })
    })

    it('Create user', () => {
        const name = faker.name.firstName()
        const email = faker.internet.email()
        const gender = faker.name.gender(true).toLowerCase()

        user.post({
            name: name,
            email: email,
            gender: gender,
            statusCode: 201,
            statusText: 'Created'
        }).then(response => {
            userID = response.body.id
            expect(response.body.email).eq(email)
            expect(response.body.name).eq(name)
            expect(response.body.gender).eq(gender)
            expect(response.body.status).eq('active')
        })
    })

    it('All users', () => {
        user.get({}).then(response => {
            expect(response.body).to.be.a('array')
            expect(response.body.length).to.be.gt(0)
        })
    })

    it('Edit user without name', () => {
        user.put({
            userID: userID,
            name: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('name')
            expect(response.body[0].message).eql('can\'t be blank');
        })
    })

    it('Edit user without email', () => {
        user.put({
            userID: userID,
            email: '',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('can\'t be blank');
        })
    })

    it('Edit user with invalid email format - missing domain', () => {
        user.put({
            userID: userID,
            email: 'test@.com',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('is invalid');
        })
    })

    it('Edit user with invalid email format - missing username', () => {
        user.put({
            userID: userID,
            email: '@test.com',
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('is invalid');
        })
    })

    // Ovaj test case takodje pada kao i kod create-a
    // ocekivano je da user ne bude kreiran i izbaci nam gresku 'invalid email',
    // medjutim user je kreiran
    it('Edit user with invalid email format - missing .com', () => {
        user.put({
            userID: userID,
            email: faker.internet.email().replace('.com', ''),
            statusCode: 422,
            statusText: 'Unprocessable Entity'
        }).then(response => {
            expect(response.body[0].field).eql('email')
            expect(response.body[0].message).eql('invalid mail');
        })
    })

    it('Edit user', () => {
        const name = faker.name.firstName()
        user.put({userID: userID, name: name}).then(response => {
            expect(response.body.name).eq(name)
            expect(response.body.id).eq(userID)
        })
    })

    it('Delete user', () => {
        user.delete({
            userID: userID,
            statusCode: 204,
            statusText: 'No Content'
        })
    })

    it('Delete an user that has already been deleted', () => {
        user.delete({
            userID: userID,
            statusCode: 404,
            statusText: 'Not Found'
        }).then(response => {
            expect(response.body.message).eq('Resource not found')
        })
    })
})