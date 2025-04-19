export default class Product {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.price = data.price || 0;
        this.description = data.description || '';
        this.category = data.category || '';
        this.image = data.image || '';

        if (data.rating) {
            this.rating = {
                rate: data.rating.rate || 0,
                count: data.rating.count || 0
            };
        }
    }

    isValid() {
        return Boolean(this.title && this.price && this.category);
    }

    toPartialUpdatePayload(fields = ['title', 'price']) {
        return fields.reduce((obj, field) => {
            if (this[field] !== undefined) obj[field] = this[field];
            return obj;
        }, {});
    }

    toPayload() {
        const payload = {
            title: this.title,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.image
        };

        if (this.id) {
            payload.id = this.id;
        }

        return payload;
    }

    equals(otherProduct) {
        const other = otherProduct instanceof Product
            ? otherProduct
            : new Product(otherProduct);

        return this.id === other.id &&
            this.title === other.title &&
            this.price === other.price &&
            this.category === other.category;
    }
}
