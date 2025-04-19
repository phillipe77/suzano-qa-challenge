import productsService from '../../../services/productService.js';
import productFactory from '../../../factories/factory.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TIMEOUTS } from '../../../constants/api.js';

describe('Atualização de Produtos - PUT/PATCH', () => {
    let testProductId;

    afterEach(() => {
        if (testProductId) {
            productsService.deleteProduct(testProductId).then(() => {
                testProductId = null;
            });
        }
    });

    context('PUT - Atualização completa', () => {
        it('Deve atualizar um produto existente', () => {
            const timestamp = new Date().getTime();
            const newProduct = productFactory.createDefault();
            newProduct.title = `Original_${timestamp}`;

            productsService.createProduct(newProduct.toPayload()).then(createResponse => {
                testProductId = createResponse.body.id;

                const updatedProduct = productFactory.createForUpdate();
                updatedProduct.title = `Updated_${timestamp}`;

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
            const timestamp = new Date().getTime();
            const newProduct = productFactory.createDefault();
            newProduct.title = `Original_${timestamp}`;

            productsService.createProduct(newProduct.toPayload()).then(createResponse => {
                testProductId = createResponse.body.id;

                const partialData = productFactory.createPartialUpdateData();
                partialData.title = `PartialUpdate_${timestamp}`;

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
