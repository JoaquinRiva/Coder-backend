const express = require("express")
const app = express()
const port = 8000
const productos = require('./productos')
const productoRandom = require('./productsRandom')
const Contenedor = require('./contenedor/Contenedor')
const contenedorClass = new Contenedor("./productos.txt")


const producto1 = {tittle: "Escuadra", price: 125, thumbnail:"google.com"}
const producto2 = {tittle: "Lapiz", price: 50, thumbnail:"google.com"}
const producto3 = {tittle: "Regla", price: 150, thumbnail:"google.com"}
const test = async() =>{
    await contenedorClass.save(producto1)
    await contenedorClass.save(producto2)
    await contenedorClass.save(producto3)
}
test()

app.get('/productos', async (req, res)=>{
    const products = await productos()
    res.send(products)
})

app.get('/productoRandom', async (req,res)=> {
    const productRandom = await productoRandom()
    res.send(productRandom)
})


app.listen(port, (error)=>{
    error ?
    console.error(`Error al iniciar el servidor: ${error}`)
    :
    console.log(`Servidor escuchando puerto: ${port}`);
})