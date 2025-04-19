import 'cypress-mochawesome-reporter/register';
import './commands';

const DEFAULT_MAX_RESPONSE_TIME = 2000;

Cypress.Commands.overwrite('request', (originalFn, ...args) => {
    return originalFn(...args).then(response => {
        const maxTime = Cypress.env('maxResponseTime') || DEFAULT_MAX_RESPONSE_TIME;
        const responseTime = response.duration || 0;
        expect(responseTime).to.be.lessThan(
            maxTime,
            `Tempo de resposta (${responseTime}ms) excedeu o limite máximo de ${maxTime}ms`
        );

        Cypress.log({
            name: 'responseTime',
            displayName: '⏱️ Tempo',
            message: `${responseTime}ms (máx: ${maxTime}ms)`,
            consoleProps: () => {
                return {
                    'URL': response.requestHeaders?.referer || response.url,
                    'Método': response.method,
                    'Tempo máximo (ms)': maxTime,
                    'Tempo de resposta (ms)': responseTime,
                };
            }
        });

        return response;
    });
});

Cypress.on('fail', (error, runnable) => {
    console.error(`Test "${runnable.title}" failed with error: ${error.message}`);
    throw error;
});
