import Product from '../models/product.js';

class ProductFactory {
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

    createForUpdate() {
        return this.createDefault({
            title: "Produto Atualizado",
            price: 129.99,
            description: "Descrição atualizada para teste"
        });
    }

    createPartialUpdateData() {
        return {
            price: 149.99,
            title: "Produto Parcialmente Atualizado"
        };
    }
}

export default new ProductFactory();
