/**
 * Modelo que representa um produto e seus comportamentos
 */
export default class Product {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.price = data.price || 0;
        this.description = data.description || '';
        this.category = data.category || '';
        this.image = data.image || '';

        // Adiciona rating se disponível
        if (data.rating) {
            this.rating = {
                rate: data.rating.rate || 0,
                count: data.rating.count || 0
            };
        }
    }

    /**
     * Valida se o produto possui as propriedades essenciais
     */
    isValid() {
        return Boolean(this.title && this.price && this.category);
    }

    /**
     * Cria payload para atualização parcial
     * @param {Array} fields - Campos a serem incluídos no payload
     */
    toPartialUpdatePayload(fields = ['title', 'price']) {
        return fields.reduce((obj, field) => {
            if (this[field] !== undefined) obj[field] = this[field];
            return obj;
        }, {});
    }

    /**
     * Retorna o payload completo para criar/atualizar
     */
    toPayload() {
        const payload = {
            title: this.title,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.image
        };

        // Não incluir id em novos produtos
        if (this.id) {
            payload.id = this.id;
        }

        return payload;
    }

    /**
     * Verifica se dois produtos são iguais (para assertions)
     * @param {Product|Object} otherProduct - Produto para comparação
     */
    equals(otherProduct) {
        // Se for um objeto simples, converter para Product
        const other = otherProduct instanceof Product
            ? otherProduct
            : new Product(otherProduct);

        return this.id === other.id &&
            this.title === other.title &&
            this.price === other.price &&
            this.category === other.category;
    }
}