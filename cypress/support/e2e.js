// Importa o reporter para relatórios visuais
import 'cypress-mochawesome-reporter/register';

// Importa comandos personalizados
import './commands';

// Tratamento global de erros
Cypress.on('fail', (error, runnable) => {
    console.error(`Test "${runnable.title}" failed with error: ${error.message}`);
    throw error;
});