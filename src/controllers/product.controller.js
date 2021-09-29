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

    response .status( 201 ) .json({ method: 'POST', path: '/products/:id', msg: 'Crea un producto', createdProduct: productSaved });
}

export const getProductById = async ( request, response ) => {
    const
        productId = request .params .productId,
        product = await Product .findById( productId );
    response .status( 200 ) .json({ method: 'GET', path: `/products/${ productId }`, msg: 'Obtiene un producto', product: product });
}

export const updateProductById = async ( request, response ) => {
    const
        productId = request .params .productId,
        updatedProduct = await Product .findByIdAndUpdate( productId, request .body, { new: true } );

    response .status( 200 ) .json({ method: 'PUT', path: `/products/${ productId }`, msg: 'Actualiza un producto', updatedProduct: updatedProduct });   // status: 204
}

export const deleteProductById = async ( request, response ) => {
    const
        { productId } = request .params,
        deletedProduct = await Product .findByIdAndDelete( productId );

    response .status( 200 ) .json({ method: 'DELETE', path: `/products/${ productId }`, msg: 'Elimina un producto', deletedProduct: deletedProduct });  // status: 204
}