/**
 * Utilitário para assertions padronizadas de API
 */
class ApiAssertions {
    /**
     * Valida resposta de sucesso básica
     * @param {Object} response - Resposta da API
     * @param {Number} expectedStatus - Status HTTP esperado (default: 200)
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateSuccessResponse(response, expectedStatus = 200) {
        expect(response.status).to.eq(expectedStatus);
        expect(response.body).to.exist;
        return this;
    }

    /**
     * Verifica apenas o status da resposta (sem validar body)
     * @param {Object} response - Resposta da requisição
     * @param {Number} expectedStatus - Status HTTP esperado
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateStatus(response, expectedStatus = 200) {
        expect(response.status).to.eq(expectedStatus);
        return this;
    }

    /**
     * Valida que resposta tem as propriedades esperadas
     * @param {Object} response - Resposta da API
     * @param {Array} properties - Lista de propriedades a validar
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateProperties(response, properties = []) {
        properties.forEach(prop => {
            expect(response.body).to.have.property(prop);
        });
        return this;
    }

    /**
     * Versão alternativa para validar propriedades diretamente no body
     * @param {Object} body - Corpo da resposta (não a resposta completa)
     * @param {Array} properties - Propriedades a serem verificadas
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateBodyProperties(body, properties) {
        properties.forEach(property => {
            expect(body).to.have.property(property);
        });
        return this;
    }

    /**
     * Valida que valores específicos estão presentes no corpo
     * @param {Object} response - Resposta da API
     * @param {Object} expectedValues - Valores esperados {chave: valor}
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateValues(response, expectedValues = {}) {
        Object.entries(expectedValues).forEach(([prop, value]) => {
            expect(response.body[prop]).to.eq(value);
        });
        return this;
    }

    /**
     * Valida resposta de lista
     * @param {Object} response - Resposta da API
     * @param {Number} minLength - Tamanho mínimo esperado (default: 1)
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateList(response, minLength = 1) {
        expect(response.body).to.be.an('array');
        if (minLength > 0) {
            expect(response.body.length).to.be.at.least(minLength);
        }
        return this;
    }

    /**
     * Valida resposta de erro
     * @param {Object} response - Resposta da API
     * @param {Array} expectedStatuses - Status HTTP esperados
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateErrorResponse(response, expectedStatuses = [400, 404]) {
        expect(expectedStatuses).to.include(response.status);
        return this;
    }

    /**
     * Valida tempo de resposta com mensagem de erro mais descritiva
     * @param {Object} response - Resposta da API
     * @param {Number} maxTime - Tempo máximo em ms (default: 2000)
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateResponseTime(response, maxTime = 2000) {
        const responseTime = response.duration;
        expect(responseTime).to.be.lessThan(
            maxTime,
            `Response time (${responseTime}ms) should be less than ${maxTime}ms`
        );
        return this;
    }

    /**
     * Valida cabeçalhos de resposta
     * @param {Object} response - Resposta da API
     * @param {Object} expectedHeaders - Cabeçalhos esperados {chave: valor}
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateHeaders(response, expectedHeaders = {}) {
        Object.entries(expectedHeaders).forEach(([header, value]) => {
            expect(response.headers).to.have.property(header);
            if (value) {
                expect(response.headers[header]).to.include(value);
            }
        });
        return this;
    }

    /**
     * Valida tipo de conteúdo JSON
     * @param {Object} response - Resposta da API
     * @returns {ApiAssertions} - Para encadeamento de método
     */
    validateJsonContentType(response) {
        return this.validateHeaders(response, {
            'content-type': 'application/json'
        });
    }
}

export default new ApiAssertions();