import {faker} from '@faker-js/faker';
module.exports = {

    post({
        name = faker.name.firstName(),
        gender = faker.name.gender(true),
        email = faker.internet.email(),
        status = 'active',
        statusCode = 200,
        statusText = 'OK'
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: `${Cypress.env('baseAPI')}/users`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cypress.env('accessToken')}`
            },
            body: {
             'name': name,
             'gender': gender,
             'email': email,
             'status': status
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    get({
        statusCode = 200,
        statusText = 'OK'
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: `${Cypress.env('baseAPI')}/users`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    put({
        name = faker.name.firstName(),
        email = faker.internet.email(),
        status = 'active',
        userID = '',
        statusCode = 200,
        statusText = 'OK'
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `${Cypress.env('baseAPI')}/users/${userID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cypress.env('accessToken')}`
            },
            body: {
                'name': name,
                'email':email,
                'status': status
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    },

    delete({
        userID = '',
        statusCode = 200,
        statusText = 'OK'
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: 'DELETE',
            url: `${Cypress.env('baseAPI')}/users/${userID}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(response => {
            expect(response.status).eql(statusCode);
            expect(response.statusText).eql(statusText);
        })
    }
}