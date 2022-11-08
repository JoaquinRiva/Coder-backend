const Contenedor = require('./contenedor/Contenedor')
const contenedorClass = new Contenedor("./productos.txt")
const productos = require('./productos')

module.exports = productoRandom = async () => {
    try {
        const products = await productos()
        randomNumber = Math.ceil(Math.random() * ((products.length -1) - 0) + 0);
        return await contenedorClass.getById(randomNumber)
    } catch (error) {
        console.error(`Error en productoRandom: ${error}`);
    }
}