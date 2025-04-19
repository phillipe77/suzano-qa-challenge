# Suzano QA Challenge - Framework de Automação de Testes API

## 📖 Visão Geral

Este projeto é um framework de automação de testes para APIs RESTful, . Na qual se utiliza o **Cypress** na validação de endpoints, performance e geração de relatórios detalhados. O framework é modular, escalável e integrado com **GitHub Actions** para execução contínua e publicação de relatórios no **GitHub Pages**.

---

## 🛠️ Tecnologias Utilizadas

- **Cypress**: Framework de testes 
- **cypress-mochawesome-reporter**: Geração de relatórios HTML detalhados.
- **AJV**: Validação de esquemas JSON.
- **GitHub Actions**: Pipeline de CI/CD para execução automatizada.
- **GitHub Pages**: Publicação de relatórios de teste.
- **Node.js**: Ambiente de execução para JavaScript.

---

## 🗂️ Estrutura do Projeto

```
suzano-qa-challenge/
├── .github/workflows/        # Configuração de CI/CD
│   └── cypress.yml           # Pipeline de execução de testes e publicação de relatórios
│
├── cypress/
│   ├── e2e/                  # Testes organizados por funcionalidade
│   │   └── api/
│   │       └── products/     # Testes para endpoints de produtos
│   │           ├── get.spec.js      # Testes para operações GET
│   │           ├── post.spec.js     # Testes para operações POST
│   │           ├── update.spec.js   # Testes para operações PUT/PATCH
│   │           ├── delete.spec.js   # Testes para operações DELETE
│   │           └── negative.spec.js # Testes de cenários negativos
│   │
│   ├── factories/            # Geração de Dados para testes
│   │   └── factory.js        # Criação de objetos de produto
│   │
│   ├── fixtures/             # Dados de teste (JSON)
│   │   └── schemas/          # Esquemas JSON para validação
│   │
│   ├── reports/              # Relatórios gerados pelos testes
│   │
│   ├── support/              # Arquivos de suporte
│   │   ├── commands.js       # Comandos do Cypress
│   │   └── e2e.js            # Configuração global para testes 
│   │
│   └── utils/                # Utilitários reutilizáveis
│       ├── apiAssertions.js  # Validações de API 
│       └── schemaValidator.js # Validação de esquemas JSON
│
├── cypress.config.js         # Configuração do Cypress
├── package.json              # Dependências e scripts NPM
└── README.md                 # arquivo de documentação
```

---

## 🚀 Funcionalidades

- **Testes de API**:
  - Operações GET, POST, PUT/PATCH e DELETE.
  - Testes de cenários negativos.
  - Validação de tempo de resposta.
  - Validação de esquemas JSON.

- **Relatórios Detalhados**:
  - Relatórios HTML gerados automaticamente 
  - Publicação no GitHub Pages para fácil acesso.

- **Execução Paralela**:
  - Divisão dos testes em jobs paralelos para maior eficiência.

- **Validações Automáticas**:
  - Validação de status HTTP, tempo de resposta e estrutura de dados.

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Git

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/suzano-qa-challenge.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd suzano-qa-challenge
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

---

## 📋 Comandos Disponíveis

| Comando                     | Descrição                                                                 |
|-----------------------------|---------------------------------------------------------------------------|
| `npm test`                  | Executa todos os testes.                                                 |
| `npm run test:parallel`     | Executa os testes em paralelo.                                           |
| `npm run test:api`          | Executa apenas os testes de API.                                         |
| `npm run test:products`     | Executa os testes relacionados a produtos.                              |
| `npm run test:get`          | Executa os testes de operações GET.                                      |
| `npm run test:post`         | Executa os testes de operações POST.                                     |
| `npm run test:update`       | Executa os testes de operações PUT/PATCH.                                |
| `npm run test:delete`       | Executa os testes de operações DELETE.                                   |
| `npm run test:negative`     | Executa os testes de cenários negativos.                                 |
| `npm run test:open`         | Abre o Cypress em modo interativo.                                       |
| `npm run report`            | Gera relatórios consolidados.                                            |

---

## 🏛️ Arquitetura do Framework

### Padrões de Projeto e Boas Práticas Utilizados

1. **Factory Pattern**  
   - 📁 Implementado em `factories/factory.js` para geração dinâmica e reutilizável de dados de teste.  
   - ✅ **Benefício**: Facilita a criação de cenários variados com dados customizados, promovendo testes mais robustos e escaláveis.

2. **Command Pattern**  
   - 📁 Aplicado em `support/commands.js` para encapsular comandos personalizados e reutilizáveis do Cypress.  
   - ✅ **Benefício**: Reduz duplicação de código, melhora a organização das ações e torna os testes mais legíveis.

3. **Fluent Interface**  
   - 📁 Implementado em `utils/apiAssertions.js` para encadeamento elegante de validações.  
   - ✅ **Benefício**: Proporciona legibilidade ao código de testes e torna as asserções mais claras.

4. **Validation Layer**  
   - 📁 Centralizado em `utils/schemaValidator.js` e os esquemas em `schemas/productSchema.js`, validando a estrutura dos objetos de resposta da API.  
   - ✅ **Benefício**: Garante a conformidade com os contratos da API e facilita verificar  quebras em integrações.

5. **Helper Layer**  
   - 📁 Armazenada em `helpers/productHelper.js`, contendo funções utilitárias específicas para a manipulação de produtos.  
   - ✅ **Benefício**: Reúne lógica auxiliar em um único local, promovendo reutilização e clareza no código dos testes.

6. **Service Layer**  
   - 📁 Implementada em `services/productService.js`, responsável pelas chamadas diretas aos endpoints de produto.  
   - ✅ **Benefício**: Abstrai a lógica de requisições HTTP, melhora a organização e facilita a manutenção e reaproveitamento.

7. **Data Modeling (Modelos de Entidade)**  
   - 📁 Definido em `models/product.js`, estruturando os atributos esperados para a entidade `Product`.  
   - ✅ **Benefício**: Padroniza os dados manipulados nos testes e assegura consistência nos cenários validados.

8. **Uso de Fixtures**  
   - 📁 Dados estáticos centralizados em `fixtures/products/newProduct.json`, usados como referência para entrada ou validação em testes.  
   - ✅ **Benefício**: Garante reprodutibilidade, consistência e facilidade de alteração dos dados base.

9. **Relatórios Automatizados**  
   - 📁 Gerados em `reports/`, integrados via `multi-reporter-config.json` e `mochawesome`, permitindo visualização amigável dos resultados de testes.  
   - ✅ **Benefício**: Fornece feedback claro sobre falhas e serve como documentação viva dos testes.

10. **Organização por Camada de Testes**  
   - 📁 Estrutura de testes definida em `e2e/api/products`, separando testes por verbo HTTP (`get.spec.js`, `post.spec.js`, etc).  
   - ✅ **Benefício**: Facilita leitura, manutenção e rastreamento de falhas por tipo de operação.


---

## 📊 Relatórios

Os relatórios são gerados automaticamente após a execução dos testes e publicados no GitHub Pages. Eles incluem:
- Status de execução (sucesso/falha).
- Tempo de execução de cada teste.
- Validações realizadas.
- Gráficos e métricas detalhadas.

### Acesso aos Relatórios

Os relatórios podem ser acessados em:  
https://phillipe77.github.io/suzano-qa-challenge/

---

## 🔄 Pipeline de CI/CD

A pipeline de CI/CD é implementada com GitHub Actions e realiza as seguintes etapas:

1. **Execução de Testes**:
   - Os testes são divididos em jobs paralelos para maior eficiência.

2. **Armazenamento de Artefatos**:
   - Relatórios e logs são armazenados como artefatos para análise posterior.

3. **Publicação de Relatórios**:
   - Relatórios são organizados e publicados no GitHub Pages.

---

## 🔮 Escalabilidade

### Possíveis implementações

- **Testes de Contrato**: Implementação de validação de contratos com Pact.
- **Testes de Carga**: Avaliação de comportamento sob alta demanda.
- **Dashboard de Métricas**: Monitoramento contínuo da qualidade da API.

### Expansão de Funcionalidades

- Adição de novos endpoints e cenários de teste de maneira fácil.
- Integração com ferramentas de gestão de testes, como TestRail.

---

## 🤝 Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Faça push para a branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

---

## 📝 Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo package.json para mais detalhes.

---

