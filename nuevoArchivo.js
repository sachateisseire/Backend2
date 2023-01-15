import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = JSON.parse(fs.readFileSync('./products.js')) || [];
        this.proximoId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log('¡¡Debes completar todos los campos!!');
            return;
        }

        const existenteProducto = this.products.find(p => p.code === product.code);
        if (existenteProducto) {
            console.log('Ya ingresaste un producto con ese código');
            return;
        }

        product.id = this.proximoId++;
        this.products.push(product);
        this.save();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);

        if (!product) {
            console.log('Not found');
            return;
        }

        return product;
    }

    modifyProduct(id, newProduct) {
        const index = this.products.findIndex(p => p.id === id);

        if (index === -1) {
            console.log('Producto no encontrado');
            return;
        }

        this.products[index] = { ...this.products[index], ...newProduct };
        this.save();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);

        if (index === -1) {
            console.log('Producto no encontrado');
            return;
        }

        this.products.splice(index, 1);
        this.save();
    }

    save() {
        fs.writeFileSync('./products.js', JSON.stringify(this.products));
    }
}

const productManager = new ProductManager();


productManager.addProduct({
  title: 'Trigo',
  description: 'Descripción del trigo',
  price: 500,
  thumbnail: 'http://',
  code: 'codigo1',
  stock: 2200
});