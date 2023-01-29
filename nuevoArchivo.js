import fs from 'fs'
import express from "express";

const app = express()
const port = 8000

app.use(express.urlencoded({extended:true}))

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})

app.get('/', (req, res)=>{
    res.send('Para examinar nuestro catálogo, utilice /products para verlo completo, o /products/id para ver alguno en especial')
})


app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    let products = await fs.promises.readFile('./products.json');
    products = JSON.parse(products);
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const productManager = new ProductManager('./products.json');
    const product = productManager.getProductById(Number(pid));
    if (!product) {
    res.send('Producto no encontrado');
    }
    res.json({ product });
});


class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = JSON.parse(fs.readFileSync('./products.json')) || [];
        this.proximoId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
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

        product.id = this.proximoId;
        this.proximoId++;
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
        fs.writeFileSync('./products.json', JSON.stringify(this.products));
    }
}


