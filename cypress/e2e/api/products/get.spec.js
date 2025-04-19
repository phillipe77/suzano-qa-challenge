import productsService from '../../../services/productService.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TEST_IDS, CATEGORIES, TIMEOUTS } from '../../../constants/api.js';
import productSchema from '../../../fixtures/schemas/productSchema';

describe('Consultas de Produtos - GET', () => {
    it('Deve retornar todos os produtos', () => {
        productsService.getAllProducts().then((response) => {
            apiAssertions
                .validateSuccessResponse(response)
                .validateList(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME)
                .validateJsonContentType(response);

            cy.validateSchema(response.body[0], productSchema);
        });
    });

    it('Deve retornar um produto específico por ID', () => {
        cy.getAndValidateProduct(TEST_IDS.EXISTING_PRODUCT).then(response => {
            apiAssertions
                .validateProperties(response, ['title', 'price', 'description', 'category', 'image'])
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            cy.validateSchema(response.body, productSchema);
        });
    });

    it('Deve listar todas as categorias de produtos', () => {
        cy.getProductCategories().then((response) => {
            apiAssertions
                .validateList(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            response.body.forEach(category => {
                expect(category).to.be.a('string');
            });
        });
    });

    it('Deve filtrar produtos por categoria', () => {
        const category = CATEGORIES[0];

        cy.getProductsByCategory(category).then((response) => {
            apiAssertions
                .validateList(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            response.body.forEach(product => {
                expect(product.category).to.eq(category);
            });
        });
    });

    it('Deve limitar o número de produtos retornados', () => {
        const limit = 5;

        productsService.getAllProducts({ limit }).then((response) => {
            apiAssertions
                .validateSuccessResponse(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            expect(response.body).to.have.length.at.most(limit);
        });
    });
});
