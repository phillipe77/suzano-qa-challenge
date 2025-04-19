import productsService from '../../../services/productService.js';
import productFactory from '../../../factories/factory.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TIMEOUTS } from '../../../constants/api.js';

describe('Exclusão de Produtos - DELETE', () => {
    let createdProductId;

    afterEach(() => {
        if (createdProductId) {
            productsService.deleteProduct(createdProductId).then(() => {
            }, () => {
            });
            createdProductId = null;
        }
    });

    it('Deve excluir um produto', () => {
        const timestamp = new Date().getTime();
        const newProduct = productFactory.createDefault();
        newProduct.title = `ToDelete_${timestamp}`;

        productsService.createProduct(newProduct.toPayload()).then(createResponse => {
            createdProductId = createResponse.body.id;

            productsService.deleteProduct(createdProductId).then(response => {
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.lessThan(TIMEOUTS.RESPONSE_TIME);

                createdProductId = null;
            });
        });
    });
});
