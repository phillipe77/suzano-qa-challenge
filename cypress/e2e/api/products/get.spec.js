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

            // Validar schema do primeiro produto
            cy.validateSchema(response.body[0], productSchema);
        });
    });

    it('Deve retornar um produto específico por ID', () => {
        // Usar o comando personalizado em vez da chamada direta ao serviço
        cy.getAndValidateProduct(TEST_IDS.EXISTING_PRODUCT).then(response => {
            // Validações adicionais
            apiAssertions
                .validateProperties(response, ['title', 'price', 'description', 'category', 'image'])
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            // Validar schema
            cy.validateSchema(response.body, productSchema);
        });
    });

    it('Deve listar todas as categorias de produtos', () => {
        cy.getProductCategories().then((response) => {
            apiAssertions
                .validateList(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            // Verificar que todas as categorias são strings
            response.body.forEach(category => {
                expect(category).to.be.a('string');
            });
        });
    });

    it('Deve filtrar produtos por categoria', () => {
        // Usar uma categoria constante
        const category = CATEGORIES[0]; // 'electronics'

        cy.getProductsByCategory(category).then((response) => {
            apiAssertions
                .validateList(response)
                .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);

            // Verificar que todos os produtos pertencem à categoria
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

            // Validar que o número de produtos é limitado
            expect(response.body).to.have.length.at.most(limit);
        });
    });
});