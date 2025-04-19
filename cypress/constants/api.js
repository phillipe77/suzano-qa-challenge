

export const ENDPOINTS = {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id) => `/products/${id}`,
    CATEGORIES: '/products/categories',
    PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
    CARTS: '/carts',
    USERS: '/users',
    LOGIN: '/auth/login'
};


export const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};


export const CATEGORIES = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing"
];


export const TEST_IDS = {
    EXISTING_PRODUCT: 1,
    NON_EXISTING_PRODUCT: 9999
};


export const TIMEOUTS = {
    DEFAULT: 10000,
    RESPONSE_TIME: 2000
};