
export default {
    type: 'object',
    required: ['id', 'title', 'price', 'category', 'description', 'image'],
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        category: { type: 'string' },
        image: { type: 'string' },
        rating: {
            type: 'object',
            properties: {
                rate: { type: 'number' },
                count: { type: 'number' }
            }
        }
    }
};