import productFactory from '../factories/factory.js';
import productsService from '../services/productService.js';

/**
 * Helper para operações comuns com produtos
 */
class ProductHelper {
    /**
     * Garante que existe um produto para teste e retorna seu ID
     * @returns {Cypress.Chainable} - Promessa com o ID do produto
     */
    ensureProductExists() {
        return cy.wrap(null).then(() => {
            // Verifica se já temos um ID em cache no ambiente Cypress
            const existingId = Cypress.env('productId');

            if (existingId) {
                return existingId;
            } else {
                // Se não tiver, cria um produto
                const newProduct = productFactory.createDefault();

                return productsService.createProduct(newProduct.toPayload()).then(response => {
                    const id = response.body.id;
                    // Armazena o ID no ambiente para uso futuro
                    Cypress.env('productId', id);
                    return id;
                });
            }
        });
    }

    /**
     * Limpa os dados de teste criados
     * @returns {Cypress.Chainable} - Promessa para garantir conclusão da operação
     */
    cleanupTestData() {
        const productId = Cypress.env('productId');
        if (productId) {
            // Retornar a promise para permitir encadeamento e garantir conclusão
            return productsService.deleteProduct(productId).then(() => {
                Cypress.env('productId', null);
            });
        }
        return cy.wrap(null); // Retorna uma promise resolvida se não houver produto
    }
}

export default new ProductHelper();