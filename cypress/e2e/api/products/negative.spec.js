import productsService from '../../../services/productService.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { STATUS, TEST_IDS } from '../../../constants/api.js';

describe('Testes Negativos de API - Produtos', () => {
    it('Deve lidar com ID de produto inexistente', () => {
        productsService.getProductById(TEST_IDS.NON_EXISTING_PRODUCT).then((response) => {
            apiAssertions.validateErrorResponse(response, [STATUS.OK, STATUS.BAD_REQUEST, STATUS.NOT_FOUND]);

            if (response.status === STATUS.OK) {
                expect(response.body).to.be.empty;
            }
        });
    });

    it('Deve lidar com formato inválido de ID', () => {
        productsService.getProductById('invalid-id').then((response) => {
            apiAssertions.validateErrorResponse(response, [STATUS.OK, STATUS.BAD_REQUEST, STATUS.NOT_FOUND]);

            if (response.status === STATUS.OK) {
                expect(response.body).to.be.empty;
            }
        });
    });

    it('Deve lidar com categoria inexistente', () => {
        productsService.getProductsByCategory('categoria-inexistente').then((response) => {
            apiAssertions.validateErrorResponse(response, [STATUS.OK, STATUS.BAD_REQUEST, STATUS.NOT_FOUND]);

            if (response.status === STATUS.OK) {
                apiAssertions.validateList(response, 0);
            }
        });
    });
});