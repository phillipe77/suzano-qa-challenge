import Ajv from 'ajv';
import addFormats from 'ajv-formats';

class SchemaValidator {
    constructor() {
        this.ajv = new Ajv({ allErrors: true });
        addFormats(this.ajv);
    }

    validate(data, schema) {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
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
