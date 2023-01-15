// CLASE //

class ProductManager {

    constructor() {


      this.products = [];
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


      this.products.push(product)
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
  }

// AGREGAR PRODUCTOS ///

  const productManager = new ProductManager();


productManager.addProduct({
  title: 'Trigo',
  description: 'Descripción del trigo',
  price: 500,
  thumbnail: 'http://',
  code: 'codigo1',
  stock: 2200
});

productManager.addProduct({
  title: 'Maíz',
  description: 'Descripción del maiz',
  price: 350,
  thumbnail: 'http://',
  code: 'codigo2',
  stock: 3220
});

// TESTEO //

console.log(productManager.getProducts())

const product = productManager.getProductById(1);
console.log(product);

productManager.getProductById(2)