import express from 'express'
import ProductManager from './ProductManager.js'

const productManager = new ProductManager();


const PORT = 4000;

//Genero una intancia a express 
const app = express();

app.get('/', (req, res) => {
    res.send('Hola mundo!!')
})

app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})

// Query Params

// Para buscar por parámetros usamos la notación en la URL: ruta?nombreCat=valor


app.get('/products', async (req, res) => {
    let cpProducts = await productManager.getProducts();
    
    if ("limit" in req.query){
        const lim = parseInt(req.query.limit, 10);
        if(lim > 0){
            cpProducts = cpProducts.slice(0, lim)
            res.send(cpProducts)
        }else{
            res.send("Debe ingresar un número como limit mayor a cero!!!")
        }

    }
    else{
        
        res.send(cpProducts)
    }
    
})

//Consultar por id

app.get('/products/:id', async (req, res) => {

    const producto = await productManager.getProductById(parseInt(req.params.id, 10))
    if (producto != undefined)
        res.send(producto)
    else    
        res.send("Producto no existente!")

})


