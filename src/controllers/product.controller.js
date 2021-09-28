// Controller Product

export const getProducts = ( request, response ) => {
    response .json({ method: 'GET', path: '/products', msg: 'Obtiene todos los productos' });
}

export const createProduct = ( request, response ) => {
    response .json({ method: 'POST', path: '/products/:id', msg: 'Crea un producto' });
}

export const getProductById = ( request, response ) => {
    response .json({ method: 'GET', path: '/products/:id', msg: 'Obtiene un producto' });
}

export const updateProductById = ( request, response ) => {
    response .json({ method: 'PUT', path: '/products/:id', msg: 'Actualiza un producto' });
}

export const deleteProductById = ( request, response ) => {
    response .json({ method: 'DELETE', path: '/products/:id', msg: 'Elimina un producto' });
}