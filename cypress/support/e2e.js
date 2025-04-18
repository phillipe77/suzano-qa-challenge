// Importa o reporter para relatórios visuais
import 'cypress-mochawesome-reporter/register';

// Importa comandos personalizados
import './commands';

// Configuração do tempo máximo de resposta (em milissegundos)
const DEFAULT_MAX_RESPONSE_TIME = 2000; // 2 segundos

/**
 * Sobrescreve o comando request padrão do Cypress para adicionar
 * validação automática de tempo de resposta em todas as requisições
 */
Cypress.Commands.overwrite('request', (originalFn, ...args) => {
    return originalFn(...args).then(response => {
        // Obtém o tempo máximo de resposta da configuração ou usa o valor padrão
        const maxTime = Cypress.env('maxResponseTime') || DEFAULT_MAX_RESPONSE_TIME;

        // Valida o tempo de resposta
        const responseTime = response.duration || 0;
        expect(responseTime).to.be.lessThan(
            maxTime,
            `Tempo de resposta (${responseTime}ms) excedeu o limite máximo de ${maxTime}ms`
        );

        // Registra o tempo no log para melhor visibilidade
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

// Tratamento global de erros
Cypress.on('fail', (error, runnable) => {
    console.error(`Test "${runnable.title}" failed with error: ${error.message}`);
    throw error;
});