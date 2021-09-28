import Product from '../models/Product';
// Controller Product

export const getProducts = async ( request, response ) => {
    const products = await Product .find();
    response .status( 200 ) .json({ method: 'GET', path: '/products', msg: 'Obtiene todos los productos', products: products });
}

export const createProduct = async ( request, response ) => {
    const { name, category, price, imgUrl } = request .body;

    console .log( { name, category, price, imgUrl } );

    const newProduct = new Product({ name, category, price, imgUrl });
    const productSaved = await newProduct .save();

    response .status( 201 ) .json({ method: 'POST', path: '/products/:id', msg: 'Crea un producto', product: productSaved });
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