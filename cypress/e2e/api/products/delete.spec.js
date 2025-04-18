import productsService from '../../../services/productService.js';
import productFactory from '../../../factories/factory.js';
import apiAssertions from '../../../utils/apiAssertions.js';
import { TIMEOUTS } from '../../../constants/api.js';

describe('Exclusão de Produtos - DELETE', () => {
    let createdProductId;

    // Limpar produtos que podem não ter sido excluídos pelo teste
    afterEach(() => {
        if (createdProductId) {
            // Tentar excluir, mas ignorar qualquer erro usando then em vez de catch
            productsService.deleteProduct(createdProductId).then(() => {
                // Sucesso - produto excluído 
            }, () => {
                // Erro - produto pode já ter sido excluído, ignorar
            });
            createdProductId = null;
        }
    });

    it('Deve excluir um produto', () => {
        // Criar um produto específico para este teste
        const timestamp = new Date().getTime();
        const newProduct = productFactory.createDefault();
        newProduct.title = `ToDelete_${timestamp}`;

        // Primeiro criar um produto para depois excluir
        productsService.createProduct(newProduct.toPayload()).then(createResponse => {
            createdProductId = createResponse.body.id;

            // Excluir o produto que acabamos de criar
            productsService.deleteProduct(createdProductId).then(response => {
                // Validar apenas o status, não o corpo (a API FakeStoreAPI pode não retornar corpo)
                expect(response.status).to.eq(200);
                expect(response.duration).to.be.lessThan(TIMEOUTS.RESPONSE_TIME);

                // Indicar que o produto foi excluído com sucesso
                createdProductId = null;
            });
        });
    });
});