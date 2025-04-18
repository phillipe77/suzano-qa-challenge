import productsService from '../../../services/productService.js';
import productFactory from '../../../factories/factory.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TIMEOUTS } from '../../../constants/api.js';

describe('Criação de Produtos - POST', () => {
    let testProductId;

    // Limpar após cada teste para não deixar dados residuais
    afterEach(() => {
        if (testProductId) {
            productsService.deleteProduct(testProductId).then(() => {
                testProductId = null;
            });
        }
    });

    it('Deve criar um novo produto', () => {
        // Gerar produto com identificador único para evitar colisões em execuções paralelas
        const timestamp = new Date().getTime();
        const newProduct = productFactory.createDefault();
        newProduct.title = `${newProduct.title}_${timestamp}`;

        cy.createTestProduct(newProduct.toPayload()).then((response) => {
            // Armazenar ID apenas para limpeza neste mesmo teste
            testProductId = response.body.id;

            apiAssertions
                .validateSuccessResponse(response)
                .validateProperties(response, ['id', 'title', 'price', 'description', 'category'])
                .validateValues(response, {
                    title: newProduct.title,
                    price: newProduct.price
                })
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);
        });
    });
});