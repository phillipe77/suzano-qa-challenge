import productFactory from '../factories/factory.js';
import productsService from '../services/productService.js';

class ProductHelper {
    ensureProductExists() {
        return cy.wrap(null).then(() => {
            const existingId = Cypress.env('productId');

            if (existingId) {
                return existingId;
            } else {
                const newProduct = productFactory.createDefault();

                return productsService.createProduct(newProduct.toPayload()).then(response => {
                    const id = response.body.id;
                    Cypress.env('productId', id);
                    return id;
                });
            }
        });
    }

    cleanupTestData() {
        const productId = Cypress.env('productId');
        if (productId) {
            return productsService.deleteProduct(productId).then(() => {
                Cypress.env('productId', null);
            });
        }
        return cy.wrap(null);
    }
}

export default new ProductHelper();
