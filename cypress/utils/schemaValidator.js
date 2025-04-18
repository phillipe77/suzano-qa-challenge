import Ajv from 'ajv';
import addFormats from 'ajv-formats'; // <-- adicionado

/**
 * Utilitário para validação de esquemas JSON
 */
class SchemaValidator {
    constructor() {
        this.ajv = new Ajv({ allErrors: true });
        addFormats(this.ajv); // <-- adicionado para suportar "uri", "email", etc.
    }

    /**
     * Valida se os dados estão conforme o esquema definido
     * @param {Object} data - Objeto a ser validado
     * @param {Object} schema - Esquema de validação
     * @returns {boolean} - Resultado da validação
     */
    validate(data, schema) {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            // Registra erros detalhados no log do Cypress
            Cypress.log({
                name: 'SCHEMA VALIDATION',
                message: 'Failed',
                consoleProps: () => {
                    return {
                        Errors: validate.errors,
                        Schema: schema,
                        Data: data
                    };
                }
            });

            throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`);
        }

        return true;
    }
}

export default new SchemaValidator();
