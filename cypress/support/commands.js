import apiAssertions from '../utils/apiAssertions';
import schemaValidator from '../utils/schemaValidator';
import productFactory from '../factories/factory';


Cypress.Commands.add('validateSchema', (data, schema) => {
    schemaValidator.validate(data, schema);
});


Cypress.Commands.add('getAndValidateProduct', (productId) => {
    return cy.request({
        method: 'GET',
        url: `/products/${productId}`,
        failOnStatusCode: false
    }).then(response => {
        if (response.status === 200) {
            apiAssertions.validateSuccessResponse(response);
            expect(response.body).to.have.property('id', parseInt(productId));
        }
        return response;
    });
});

Cypress.Commands.add('validateResponseTime', (response, maxTime = 2000) => {
    return apiAssertions.validateResponseTime(response, maxTime);
});


Cypress.Commands.add('createTestProduct', (productData) => {
    return cy.request({
        method: 'POST',
        url: '/products',
        body: productData
    }).then(response => {
        apiAssertions.validateSuccessResponse(response);
        Cypress.env('productId', response.body.id);
        return response;
    });
});

Cypress.Commands.add('validateSchema', (data, schema) => {
    schemaValidator.validate(data, schema);
});


Cypress.Commands.add('getAndValidateProduct', (productId) => {
    return cy.request({
        method: 'GET',
        url: `/products/${productId}`,
        failOnStatusCode: false
    }).then(response => {
        if (response.status === 200) {
            apiAssertions.validateSuccessResponse(response);
            expect(response.body).to.have.property('id', parseInt(productId));
        }
        return response;
    });
});


Cypress.Commands.add('createTestProduct', (productData = null) => {
    const data = productData || productFactory.createDefault().toPayload();

    return cy.request({
        method: 'POST',
        url: '/products',
        body: data
    }).then(response => {
        apiAssertions.validateSuccessResponse(response);
        Cypress.env('productId', response.body.id);
        return response;
    });
});


Cypress.Commands.add('getProductsByCategory', (category) => {
    return cy.request({
        method: 'GET',
        url: `/products/category/${category}`
    }).then(response => {
        apiAssertions.validateSuccessResponse(response);
        return response;
    });
});


Cypress.Commands.add('getProductCategories', () => {
    return cy.request({
        method: 'GET',
        url: '/products/categories'
    }).then(response => {
        apiAssertions.validateSuccessResponse(response);
        return response;
    });
});