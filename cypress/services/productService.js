/**
 * Service Object para produtos com melhor encapsulamento
 */
class ProductsService {
    constructor() {
        this.baseUrl = '/products';
    }

    /**
     * Método privado para lidar com requisições
     * @private
     */
    _request(method, endpoint = '', data = null, options = {}) {
        const requestOptions = {
            method,
            url: `${this.baseUrl}${endpoint}`,
            failOnStatusCode: false,
            ...options
        };

        if (data) {
            requestOptions.body = data;
        }

        return cy.request(requestOptions);
    }

    /**
     * Busca todos os produtos
     * @param {Object} options - Opções da requisição (limit, sort)
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    getAllProducts(options = {}) {
        return this._request('GET', '', null, { qs: options });
    }

    /**
     * Busca um produto específico pelo ID
     * @param {Number|String} id - ID do produto
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    getProductById(id) {
        return this._request('GET', `/${id}`);
    }

    /**
     * Lista todas as categorias de produtos
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    getCategories() {
        return this._request('GET', '/categories');
    }

    /**
     * Busca produtos por categoria
     * @param {String} category - Nome da categoria
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    getProductsByCategory(category) {
        return this._request('GET', `/category/${category}`);
    }

    /**
     * Cria um novo produto
     * @param {Object} productData - Dados do produto
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    createProduct(productData) {
        return this._request('POST', '', productData);
    }

    /**
     * Atualiza um produto existente (substitui todos os campos)
     * @param {Number} id - ID do produto
     * @param {Object} productData - Dados atualizados
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    updateProduct(id, productData) {
        return this._request('PUT', `/${id}`, productData);
    }

    /**
     * Atualiza parcialmente um produto
     * @param {Number} id - ID do produto
     * @param {Object} partialData - Dados parciais para atualização
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    partialUpdateProduct(id, partialData) {
        return this._request('PATCH', `/${id}`, partialData);
    }

    /**
     * Exclui um produto
     * @param {Number} id - ID do produto
     * @returns {Cypress.Chainable} - Promessa com a resposta
     */
    deleteProduct(id) {
        return this._request('DELETE', `/${id}`);
    }
}

export default new ProductsService();