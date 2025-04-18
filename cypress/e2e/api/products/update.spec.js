import productsService from '../../../services/productService.js';
import productFactory from '../../../factories/factory.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TIMEOUTS } from '../../../constants/api.js';

describe('Atualização de Produtos - PUT/PATCH', () => {
    let testProductId;

    // Limpar após cada teste para garantir independência
    afterEach(() => {
        if (testProductId) {
            productsService.deleteProduct(testProductId).then(() => {
                testProductId = null;
            });
        }
    });

    context('PUT - Atualização completa', () => {
        it('Deve atualizar um produto existente', () => {
            // Criar um produto específico para este teste
            const timestamp = new Date().getTime();
            const newProduct = productFactory.createDefault();
            newProduct.title = `Original_${timestamp}`;

            // Primeiro criar um produto para depois atualizar
            productsService.createProduct(newProduct.toPayload()).then(createResponse => {
                testProductId = createResponse.body.id;

                // Criar dados para atualização
                const updatedProduct = productFactory.createForUpdate();
                updatedProduct.title = `Updated_${timestamp}`;

                // Atualizar o produto
                productsService.updateProduct(testProductId, updatedProduct.toPayload()).then(response => {
                    apiAssertions
                        .validateSuccessResponse(response)
                        .validateValues(response, {
                            id: testProductId,
                            title: updatedProduct.title,
                            price: updatedProduct.price
                        })
                        .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);
                });
            });
        });
    });

    context('PATCH - Atualização parcial', () => {
        it('Deve atualizar parcialmente um produto', () => {
            // Criar um produto específico para este teste
            const timestamp = new Date().getTime();
            const newProduct = productFactory.createDefault();
            newProduct.title = `Original_${timestamp}`;

            // Primeiro criar um produto para depois atualizar parcialmente
            productsService.createProduct(newProduct.toPayload()).then(createResponse => {
                testProductId = createResponse.body.id;

                // Criar dados para atualização parcial
                const partialData = productFactory.createPartialUpdateData();
                partialData.title = `PartialUpdate_${timestamp}`;

                // Atualizar parcialmente o produto
                productsService.partialUpdateProduct(testProductId, partialData).then(response => {
                    apiAssertions
                        .validateSuccessResponse(response)
                        .validateValues(response, {
                            id: testProductId,
                            price: partialData.price,
                            title: partialData.title
                        })
                        .validateResponseTime(response, TIMEOUTS.RESPONSE_TIME);
                });
            });
        });
    });
});