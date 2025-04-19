class ApiAssertions {
    validateSuccessResponse(response, expectedStatus = 200) {
        expect(response.status).to.eq(expectedStatus);
        expect(response.body).to.exist;
        return this;
    }

    validateStatus(response, expectedStatus = 200) {
        expect(response.status).to.eq(expectedStatus);
        return this;
    }

    validateProperties(response, properties = []) {
        properties.forEach(prop => {
            expect(response.body).to.have.property(prop);
        });
        return this;
    }

    validateBodyProperties(body, properties) {
        properties.forEach(property => {
            expect(body).to.have.property(property);
        });
        return this;
    }

    validateValues(response, expectedValues = {}) {
        Object.entries(expectedValues).forEach(([prop, value]) => {
            expect(response.body[prop]).to.eq(value);
        });
        return this;
    }

    validateList(response, minLength = 1) {
        expect(response.body).to.be.an('array');
        if (minLength > 0) {
            expect(response.body.length).to.be.at.least(minLength);
        }
        return this;
    }

    validateErrorResponse(response, expectedStatuses = [400, 404]) {
        expect(expectedStatuses).to.include(response.status);
        return this;
    }

    validateResponseTime(response, maxTime = 2000) {
        const responseTime = response.duration;
        expect(responseTime).to.be.lessThan(
            maxTime,
            `Response time (${responseTime}ms) should be less than ${maxTime}ms`
        );
        return this;
    }

    validateHeaders(response, expectedHeaders = {}) {
        Object.entries(expectedHeaders).forEach(([header, value]) => {
            expect(response.headers).to.have.property(header);
            if (value) {
                expect(response.headers[header]).to.include(value);
            }
        });
        return this;
    }

    validateJsonContentType(response) {
        return this.validateHeaders(response, {
            'content-type': 'application/json'
        });
    }
}

export default new ApiAssertions();
