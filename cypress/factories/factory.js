import Product from '../models/product.js';

/**
 * Factory para criação padronizada de produtos de teste
 */
class ProductFactory {
    /**
     * Cria produto padrão para testes
     * @param {Object} overrides - Sobreescreve propriedades do produto
     * @returns {Product} - Instância de produto
     */
    createDefault(overrides = {}) {
        return new Product({
            title: 'Produto de Teste',
            price: 99.99,
            description: 'Produto padrão para testes automatizados',
            category: 'electronics',
            image: 'https://fakestoreapi.com/img/test-default.jpg',
            ...overrides
        });
    }

    /**
     * Cria produto para categoria específica
     * @param {String} category - Categoria do produto
     * @param {Object} overrides - Propriedades adicionais
     * @returns {Product} - Instância de produto
     */
    createForCategory(category, overrides = {}) {
        const baseProducts = {
            'electronics': {
                title: 'Smartphone Teste',
                price: 899.99,
                description: 'Um smartphone para testes automatizados',
                image: 'https://fakestoreapi.com/img/test-electronics.jpg'
            },
            'jewelery': {
                title: 'Anel de Ouro Teste',
                price: 499.99,
                description: 'Uma joia para testes automatizados',
                image: 'https://fakestoreapi.com/img/test-jewelery.jpg'
            },
            "men's clothing": {
                title: 'Camiseta Teste',
                price: 29.99,
                description: 'Uma peça de roupa masculina para testes',
                image: 'https://fakestoreapi.com/img/test-mens.jpg'
            },
            "women's clothing": {
                title: 'Vestido Teste',
                price: 49.99,
                description: 'Uma peça de roupa feminina para testes',
                image: 'https://fakestoreapi.com/img/test-womens.jpg'
            }
        };

        const base = baseProducts[category] || {
            title: 'Produto Padrão',
            price: 99.99,
            description: 'Descrição padrão'
        };

        return new Product({
            ...base,
            category,
            ...overrides
        });
    }

    /**
     * Cria produto com dados específicos para atualização
     * @returns {Product} - Produto para atualização
     */
    createForUpdate() {
        return this.createDefault({
            title: "Produto Atualizado",
            price: 129.99,
            description: "Descrição atualizada para teste"
        });
    }

    /**
     * Cria dados para atualização parcial
     * @returns {Object} - Dados para PATCH
     */
    createPartialUpdateData() {
        return {
            price: 149.99,
            title: "Produto Parcialmente Atualizado"
        };
    }
}

export default new ProductFactory();