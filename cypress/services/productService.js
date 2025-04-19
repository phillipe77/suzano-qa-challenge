class ProductsService {
    constructor() {
        this.baseUrl = '/products';
    }

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

    getAllProducts(options = {}) {
        return this._request('GET', '', null, { qs: options });
    }

    getProductById(id) {
        return this._request('GET', `/${id}`);
    }

    getCategories() {
        return this._request('GET', '/categories');
    }

    getProductsByCategory(category) {
        return this._request('GET', `/category/${category}`);
    }

    createProduct(productData) {
        return this._request('POST', '', productData);
    }

    updateProduct(id, productData) {
        return this._request('PUT', `/${id}`, productData);
    }

    partialUpdateProduct(id, partialData) {
        return this._request('PATCH', `/${id}`, partialData);
    }

    deleteProduct(id) {
        return this._request('DELETE', `/${id}`);
    }
}

export default new ProductsService();
